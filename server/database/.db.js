import mongoose from 'mongoose';

const connectDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Database Connected Successfully');
  } catch (error) {
    console.log('Error while connecting database');
  }
};

export default connectDatabase;
