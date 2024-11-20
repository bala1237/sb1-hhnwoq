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
      }
    };
    
    if (organizationId) {
      query.organizationId = organizationId;
    }

    const performance = await ApiUsage.aggregate([
      { $match: query },
      {
        $group: {
          _id: {
            endpoint: "$endpoint",
            method: "$method"
          },
          avgResponseTime: { $avg: "$responseTime" },
          minResponseTime: { $min: "$responseTime" },
          maxResponseTime: { $max: "$responseTime" },
          p95ResponseTime: {
            $percentile: {
              input: "$responseTime",
              p: 0.95
            }
          },
          totalCalls: { $sum: 1 },
          successRate: {
            $avg: {
              $cond: [{ $lt: ["$statusCode", 400] }, 1, 0]
            }
          }
        }
      },
      {
        $project: {
          endpoint: "$_id.endpoint",
          method: "$_id.method",
          avgResponseTime: { $round: ["$avgResponseTime", 2] },
          minResponseTime: { $round: ["$minResponseTime", 2] },
          maxResponseTime: { $round: ["$maxResponseTime", 2] },
          p95ResponseTime: { $round: ["$p95ResponseTime", 2] },
          totalCalls: 1,
          successRate: { $multiply: ["$successRate", 100] }
        }
      },
      { $sort: { avgResponseTime: 1 } }
    ]);

    return NextResponse.json(performance);
  } catch (error) {
    console.error('Error fetching performance analytics:', error);
    return NextResponse.json(
      { error: 'Failed to fetch performance analytics' },
      { status: 500 }
    );
  }
}