"use client";

import mongoose from 'mongoose';

const policySchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  type: { 
    type: String, 
    enum: ['custom', 'predefined', 'system'],
    required: true
  },
  scope: { 
    type: String, 
    enum: ['global', 'organization', 'team'],
    required: true
  },
  rules: [{
    resource: String,
    action: String,
    effect: { type: String, enum: ['allow', 'deny'] },
    conditions: mongoose.Schema.Types.Mixed
  }],
  priority: { 
    type: String, 
    enum: ['high', 'medium', 'low'],
    default: 'medium'
  },
  status: { 
    type: String, 
    enum: ['active', 'inactive'],
    default: 'active'
  },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

export const Policy = mongoose.models.Policy || mongoose.model('Policy', policySchema);