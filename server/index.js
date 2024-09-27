import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cors from 'cors';
import connectDatabase from './database/.db.js';
import router from './routes/feedback.js';

const app = express();

dotenv.config();
connectDatabase();

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use('', router);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on PORT ${process.env.PORT}`);
});
