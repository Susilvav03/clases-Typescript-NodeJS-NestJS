import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { router, initRoutes } from './routes/main.ts';

const PORT = process.env.PORT || 3001;
const app = express();

// CORS configuration
const whitelist = ['http://localhost:3009', 'http://localhost:5173/'];
const corsOptions = {
  origin: (origin:any, callback:any) => {
    if (whitelist.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
};

app.use(cors());
app.use(express.json());

await initRoutes();
app.use(router);

app.listen(PORT, ()=> {console.log(`Server started on port ${PORT}`)});