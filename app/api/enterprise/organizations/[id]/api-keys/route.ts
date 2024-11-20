"use client";

import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import { Organization } from '@/lib/models/organization';
import { AuditLog } from '@/lib/models/audit-log';
import crypto from 'crypto';

// Generate a secure API key
function generateApiKey() {
  return `pk_${crypto.randomBytes(32).toString('hex')}`;
}

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect();
    const organization = await Organization.findById(params.id)
      .select('apiKeys');

    if (!organization) {
      return NextResponse.json(
        { error: 'Organization not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(organization.apiKeys);
  } catch (error) {
    console.error('Error fetching API keys:', error);
    return NextResponse.json(
      { error: 'Failed to fetch API keys' },
      { status: 500 }
    );
  }
}

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect();
    const data = await request.json();
    const newApiKey = {
      name: data.name,
      key: generateApiKey(),
      status: 'active',
      createdAt: new Date(),
      lastUsed: null
    };

    const organization = await Organization.findByIdAndUpdate(
      params.id,
      { 
        $push: { apiKeys: newApiKey },
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

    // Log API key creation
    await AuditLog.create({
      action: 'API Key Created',
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
      metadata: {
        apiKeyName: data.name
      },
      status: 'success'
    });

    return NextResponse.json(newApiKey, { status: 201 });
  } catch (error) {
    console.error('Error creating API key:', error);
    return NextResponse.json(
      { error: 'Failed to create API key' },
      { status: 500 }
    );
  }
}