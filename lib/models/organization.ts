"use client";

import mongoose from 'mongoose';

const organizationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  status: { 
    type: String, 
    enum: ['active', 'suspended', 'inactive'],
    default: 'active'
  },
  apiKeys: [{
    name: String,
    key: String,
    status: { type: String, enum: ['active', 'revoked'] },
    createdAt: Date,
    lastUsed: Date
  }],
  settings: {
    rateLimit: { type: Number, default: 1000 },
    webhookUrl: String,
    ipWhitelist: [String],
    customDomain: String
  },
  contacts: {
    technical: { type: String, required: true }
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

export const Organization = mongoose.models.Organization || mongoose.model('Organization', organizationSchema);