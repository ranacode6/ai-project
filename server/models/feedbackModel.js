import mongoose from 'mongoose';

const feedbackSchema = new mongoose.Schema({
  feedback: { type: String, required: true },
  sentiment: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model('FeedBack', feedbackSchema);
