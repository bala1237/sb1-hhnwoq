"use client";

import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import { Organization } from '@/lib/models/organization';
import { AuditLog } from '@/lib/models/audit-log';

export async function PUT(
  request: Request,
  { params }: { params: { id: string; keyId: string } }
) {
  try {
    await dbConnect();
    const data = await request.json();

    const organization = await Organization.findOneAndUpdate(
      { 
        _id: params.id,
        'apiKeys._id': params.keyId
      },
      { 
        $set: {
          'apiKeys.$.name': data.name,
          'apiKeys.$.status': data.status,
          updatedAt: new Date()
        }
      },
      { new: true }
    );

    if (!organization) {
      return NextResponse.json(
        { error: 'Organization or API key not found' },
        { status: 404 }
      );
    }

    // Log API key update
    await AuditLog.create({
      action: 'API Key Updated',
      actor: {
        userId: request.headers.get('user-id'),
        email: request.headers.get('user-email'),
        role: request.headers.get('user-role')
      },
      target: {
        type: 'organization',
        id: organization._id,
        name: organization.name
      },
      changes: data,
      status: 'success'
    });

    const updatedKey = organization.apiKeys.find(
      key => key._id.toString() === params.keyId
    );

    return NextResponse.json(updatedKey);
  } catch (error) {
    console.error('Error updating API key:', error);
    return NextResponse.json(
      { error: 'Failed to update API key' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string; keyId: string } }
) {
  try {
    await dbConnect();
    
    const organization = await Organization.findByIdAndUpdate(
      params.id,
      { 
        $pull: { apiKeys: { _id: params.keyId } },
        updatedAt: new Date()
      },
      { new: true }
    );

    if (!organization) {
      return NextResponse.json(
        { error: 'Organization not found' },
        { status: 404 }
      );
    }

    // Log API key deletion
    await AuditLog.create({
      action: 'API Key Deleted',
      actor: {
        userId: request.headers.get('user-id'),
        email: request.headers.get('user-email'),
        role: request.headers.get('user-role')
      },
      target: {
        type: 'organization',
        id: organization._id,
        name: organization.name
      },
      status: 'success'
    });

    return NextResponse.json({ message: 'API key deleted successfully' });
  } catch (error) {
    console.error('Error deleting API key:', error);
    return NextResponse.json(
      { error: 'Failed to delete API key' },
      { status: 500 }
    );
  }
}