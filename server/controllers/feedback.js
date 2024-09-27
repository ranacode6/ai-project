import Feedback from '../models/feedbackModel.js';
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI('AIzaSyBdkoGCoFhHU1MjyZfUcYOQMz_pjmtcsNI');

const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

const feedback = async (req, res) => {
  const { feedback } = req.body;

  if (!feedback) return res.status(400).json({ error: 'Feedback is required' });

  try {
    const prompt = `Analyze the sentiment of this text within 1 word: "${feedback}"`;

    const result = await model.generateContent(prompt);

    const sentiment = result.response.text();

    const newFeedBack = new Feedback({ feedback, sentiment });
    await newFeedBack.save();

    return res.json({ sentiment });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Failed to analyze the sentiment' });
  }
};

export default feedback;
