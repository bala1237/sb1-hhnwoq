"use client";

import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  role: { 
    type: String, 
    enum: ['enterprise_admin', 'support_manager', 'security_auditor'],
    required: true
  },
  status: { 
    type: String, 
    enum: ['active', 'inactive', 'suspended'],
    default: 'active'
  },
  organizations: [{
    organizationId: { type: mongoose.Schema.Types.ObjectId, ref: 'Organization' },
    role: String,
    status: String
  }],
  security: {
    mfaEnabled: { type: Boolean, default: false },
    lastPasswordChange: Date,
    loginAttempts: { type: Number, default: 0 },
    lastLogin: Date
  },
  preferences: {
    timezone: String,
    notifications: {
      email: { type: Boolean, default: true },
      slack: { type: Boolean, default: false }
    }
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

export const User = mongoose.models.User || mongoose.model('User', userSchema);