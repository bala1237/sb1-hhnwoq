import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
  conversationId: { type: String, required: true },
  content: { type: String, required: true },
  sender: {
    type: String,
    enum: ['user', 'agent'],
    required: true
  },
  type: {
    type: String,
    enum: ['text', 'code', 'file'],
    default: 'text'
  },
  metadata: {
    fileName: String,
    fileUrl: String,
    language: String
  },
  timestamp: { type: Date, default: Date.now },
  read: { type: Boolean, default: false }
});

const conversationSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  organizationId: { type: mongoose.Schema.Types.ObjectId, ref: 'Organization', required: true },
  agentId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  status: {
    type: String,
    enum: ['active', 'closed'],
    default: 'active'
  },
  subject: String,
  tags: [String],
  startedAt: { type: Date, default: Date.now },
  endedAt: Date,
  rating: {
    score: Number,
    feedback: String
  }
});

export const Message = mongoose.models.Message || mongoose.model('Message', messageSchema);
export const Conversation = mongoose.models.Conversation || mongoose.model('Conversation', conversationSchema);