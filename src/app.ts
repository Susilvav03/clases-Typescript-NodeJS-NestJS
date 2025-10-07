import express from 'express';
import cors from 'cors';
import { ENV } from './config/env.ts';
import { initDB, sequelize } from './config/database.ts';
import router from './routes/main.ts';
import { errorMiddleware } from './middlewares/error.middleware.ts';
import './models/user.model.ts';
import './models/product.model.ts';
import './models/order.model.ts';
import './models/order-products.model.ts';

const app = express();

// Configuration of cors with whitelist from env
const whitelist = ENV.CORS_WHITELIST?.split(',') || [];
const corsOptions = {
  origin: (origin: any, callback: any) => {
    if (!origin || whitelist.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};
app.use(cors(corsOptions));

// Middlewares to parse JSON and urlencoded
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check
app.get('/health', (_req, res) => res.json({ ok: true }));

// Routes
app.use('/api', router);

// Not Found
app.use((_req, res) => res.status(404).json({ error: 'Not Found' }));

// Error handling
app.use(errorMiddleware);

// Initialize DB and start server
(async () => {
  try {
    await initDB();
    await sequelize.sync({ alter: false });
    if (ENV.NODE_ENV !== 'test') {
      app.listen(ENV.PORT, () => {
        console.log(`🚀 Server running on port ${ENV.PORT}`);
      });
    }
  } catch (err) {
    console.error('Error initializing DB:', err);
    process.exit(1);
  }
})();

export default app;
