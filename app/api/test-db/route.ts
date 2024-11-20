import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';

export async function GET() {
  try {
    console.log('Testing database connection...');
    const mongoose = await dbConnect();
    
    // Get connection status
    const status = {
      isConnected: mongoose.connection.readyState === 1,
      readyState: mongoose.connection.readyState,
      host: mongoose.connection.host,
      port: mongoose.connection.port,
      name: mongoose.connection.name,
      models: Object.keys(mongoose.models)
    };

    console.log('Database connection status:', status);

    if (status.isConnected) {
      return NextResponse.json({
        success: true,
        message: 'Successfully connected to MongoDB',
        status
      });
    } else {
      return NextResponse.json({
        success: false,
        message: 'Failed to connect to MongoDB',
        status
      }, { status: 500 });
    }
  } catch (error) {
    console.error('Database connection test failed:', error);
    return NextResponse.json({
      success: false,
      message: 'Database connection test failed',
      error: {
        name: error.name,
        message: error.message,
        stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
      }
    }, { status: 500 });
  }
}