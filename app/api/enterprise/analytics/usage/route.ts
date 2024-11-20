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
    const interval = searchParams.get('interval') || 'day';

    let query: any = {
      timestamp: {
        $gte: new Date(startDate),
        $lte: new Date(endDate)
      }
    };
    
    if (organizationId) {
      query.organizationId = organizationId;
    }

    // Define date format based on interval
    let dateFormat = "%Y-%m-%d";
    if (interval === 'hour') {
      dateFormat = "%Y-%m-%d-%H";
    } else if (interval === 'month') {
      dateFormat = "%Y-%m";
    }

    const usage = await ApiUsage.aggregate([
      { $match: query },
      {
        $group: {
          _id: {
            date: { $dateToString: { format: dateFormat, date: "$timestamp" } },
            endpoint: "$endpoint",
            method: "$method"
          },
          totalCalls: { $sum: 1 },
          avgResponseTime: { $avg: "$responseTime" },
          successCalls: {
            $sum: {
              $cond: [{ $lt: ["$statusCode", 400] }, 1, 0]
            }
          },
          errorCalls: {
            $sum: {
              $cond: [{ $gte: ["$statusCode", 400] }, 1, 0]
            }
          }
        }
      },
      {
        $group: {
          _id: "$_id.date",
          endpoints: {
            $push: {
              endpoint: "$_id.endpoint",
              method: "$_id.method",
              totalCalls: "$totalCalls",
              avgResponseTime: "$avgResponseTime",
              successCalls: "$successCalls",
              errorCalls: "$errorCalls"
            }
          },
          totalCalls: { $sum: "$totalCalls" },
          avgResponseTime: { $avg: "$avgResponseTime" },
          successCalls: { $sum: "$successCalls" },
          errorCalls: { $sum: "$errorCalls" }
        }
      },
      { $sort: { "_id": 1 } }
    ]);

    return NextResponse.json(usage);
  } catch (error) {
    console.error('Error fetching usage analytics:', error);
    return NextResponse.json(
      { error: 'Failed to fetch usage analytics' },
      { status: 500 }
    );
  }
}