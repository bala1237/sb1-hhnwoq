"use client";

import mongoose from 'mongoose';

const apiUsageSchema = new mongoose.Schema({
  organizationId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Organization',
    required: true 
  },
  endpoint: { type: String, required: true },
  method: { 
    type: String, 
    enum: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    required: true 
  },
  statusCode: Number,
  responseTime: Number,
  timestamp: { type: Date, default: Date.now },
  metadata: {
    apiKey: String,
    userAgent: String,
    ip: String,
    errorDetails: mongoose.Schema.Types.Mixed
  }
});

// Create indexes for analytics queries
apiUsageSchema.index({ organizationId: 1, timestamp: -1 });
apiUsageSchema.index({ endpoint: 1, timestamp: -1 });
apiUsageSchema.index({ statusCode: 1, timestamp: -1 });

export const ApiUsage = mongoose.models.ApiUsage || mongoose.model('ApiUsage', apiUsageSchema);