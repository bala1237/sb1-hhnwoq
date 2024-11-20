"use client";

import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import { ApiUsage } from '@/lib/models/api-usage';

export async function GET(request: Request) {
  try {
    await dbConnect();
    
    const { searchParams } = new URL(request.url);
    const startDate = searchParams.get('startDate') || new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString();
    const endDate = searchParams.get('endDate') || new Date().toISOString();
    const organizationId = searchParams.get('organizationId');

    let query: any = {
      timestamp: {
        $gte: new Date(startDate),
        $lte: new Date(endDate)
      },
      statusCode: { $gte: 400 }
    };
    
    if (organizationId) {
      query.organizationId = organizationId;
    }

    const errors = await ApiUsage.aggregate([
      { $match: query },
      {
        $group: {
          _id: {
            statusCode: "$statusCode",
            endpoint: "$endpoint",
            method: "$method"
          },
          count: { $sum: 1 },
          errors: {
            $push: {
              timestamp: "$timestamp",
              errorDetails: "$metadata.errorDetails"
            }
          }
        }
      },
      {
        $group: {
          _id: "$_id.statusCode",
          endpoints: {
            $push: {
              endpoint: "$_id.endpoint",
              method: "$_id.method",
              count: "$count",
              errors: { $slice: ["$errors", 5] } // Last 5 errors for each endpoint
            }
          },
          totalCount: { $sum: "$count" }
        }
      },
      { $sort: { "_id": 1 } }
    ]);

    return NextResponse.json(errors);
  } catch (error) {
    console.error('Error fetching error analytics:', error);
    return NextResponse.json(
      { error: 'Failed to fetch error analytics' },
      { status: 500 }
    );
  }
}