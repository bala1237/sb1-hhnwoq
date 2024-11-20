import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable');
}

declare global {
  var mongoose: {
    conn: typeof mongoose | null;
    promise: Promise<typeof mongoose> | null;
  };
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  try {
    if (cached.conn) {
      console.log('Using cached MongoDB connection');
      return cached.conn;
    }

    if (!cached.promise) {
      const opts = {
        bufferCommands: false,
        maxPoolSize: 10,
        serverSelectionTimeoutMS: 10000,
        socketTimeoutMS: 45000,
        family: 4,
        retryWrites: true,
        w: 'majority'
      };

      console.log('Connecting to MongoDB Atlas...', {
        uri: MONGODB_URI?.replace(/\/\/([^:]+):([^@]+)@/, '//***:***@'), // Hide credentials in logs
        options: opts
      });

      cached.promise = mongoose.connect(MONGODB_URI!, opts)
        .then((mongoose) => {
          console.log('MongoDB Atlas connected successfully');
          return mongoose;
        })
        .catch((error) => {
          console.error('MongoDB Atlas connection error:', {
            name: error.name,
            message: error.message,
            code: error.code
          });
          throw error;
        });
    }

    try {
      cached.conn = await cached.promise;
    } catch (e) {
      cached.promise = null;
      throw e;
    }

    return cached.conn;
  } catch (error) {
    console.error('Error in dbConnect:', {
      name: error.name,
      message: error.message,
      code: error.code
    });
    throw error;
  }
}

// Connection event handlers
mongoose.connection.on('connected', () => {
  console.log('MongoDB Atlas connected successfully');
});

mongoose.connection.on('error', (err) => {
  console.error('MongoDB Atlas connection error:', {
    name: err.name,
    message: err.message,
    code: err.code
  });
});

mongoose.connection.on('disconnected', () => {
  console.log('MongoDB Atlas disconnected');
});

// Handle process termination
process.on('SIGINT', async () => {
  try {
    await mongoose.connection.close();
    console.log('MongoDB Atlas connection closed through app termination');
    process.exit(0);
  } catch (err) {
    console.error('Error closing MongoDB Atlas connection:', err);
    process.exit(1);
  }
});

export default dbConnect;