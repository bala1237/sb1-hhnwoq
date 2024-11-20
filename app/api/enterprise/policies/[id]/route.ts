"use client";

import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import { Policy } from '@/lib/models/policy';
import { AuditLog } from '@/lib/models/audit-log';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect();
    const policy = await Policy.findById(params.id)
      .populate('createdBy', 'fullName email');

    if (!policy) {
      return NextResponse.json(
        { error: 'Policy not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(policy);
  } catch (error) {
    console.error('Error fetching policy:', error);
    return NextResponse.json(
      { error: 'Failed to fetch policy' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect();
    const data = await request.json();

    const policy = await Policy.findByIdAndUpdate(
      params.id,
      { ...data, updatedAt: new Date() },
      { new: true, runValidators: true }
    );

    if (!policy) {
      return NextResponse.json(
        { error: 'Policy not found' },
        { status: 404 }
      );
    }

    // Log policy update
    await AuditLog.create({
      action: 'Policy Updated',
      actor: {
        userId: request.headers.get('user-id'),
        email: request.headers.get('user-email'),
        role: request.headers.get('user-role')
      },
      target: {
        type: 'policy',
        id: policy._id,
        name: policy.name
      },
      changes: data,
      status: 'success'
    });

    return NextResponse.json(policy);
  } catch (error) {
    console.error('Error updating policy:', error);
    return NextResponse.json(
      { error: 'Failed to update policy' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect();
    const policy = await Policy.findByIdAndDelete(params.id);

    if (!policy) {
      return NextResponse.json(
        { error: 'Policy not found' },
        { status: 404 }
      );
    }

    // Log policy deletion
    await AuditLog.create({
      action: 'Policy Deleted',
      actor: {
        userId: request.headers.get('user-id'),
        email: request.headers.get('user-email'),
        role: request.headers.get('user-role')
      },
      target: {
        type: 'policy',
        id: policy._id,
        name: policy.name
      },
      status: 'success'
    });

    return NextResponse.json({ message: 'Policy deleted successfully' });
  } catch (error) {
    console.error('Error deleting policy:', error);
    return NextResponse.json(
      { error: 'Failed to delete policy' },
      { status: 500 }
    );
  }
}