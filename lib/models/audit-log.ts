"use client";

import mongoose from 'mongoose';

const auditLogSchema = new mongoose.Schema({
  action: { type: String, required: true },
  actor: { 
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    email: String,
    role: String
  },
  target: {
    type: { type: String, required: true }, // e.g., 'user', 'organization', 'policy'
    id: mongoose.Schema.Types.ObjectId,
    name: String
  },
  changes: mongoose.Schema.Types.Mixed,
  metadata: {
    ip: String,
    userAgent: String,
    location: String
  },
  status: { 
    type: String, 
    enum: ['success', 'failed'],
    required: true
  },
  timestamp: { type: Date, default: Date.now }
});

// Create index for better query performance
auditLogSchema.index({ timestamp: -1 });
auditLogSchema.index({ 'actor.userId': 1 });
auditLogSchema.index({ 'target.id': 1 });

export const AuditLog = mongoose.models.AuditLog || mongoose.model('AuditLog', auditLogSchema);