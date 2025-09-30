import express from 'express'                                
import { ENV } from './config/env.ts'                           
import { initDB, sequelize } from './config/database.ts'      
import { router, initRoutes } from './routes/main.ts'               
import { errorMiddleware } from './middlewares/error.middleware.ts' 
import cors from 'cors'
import './models/users.model.ts'                                 

const app = express();   

const whitelist = ['http://localhost:5173/'];
const corsOptions = {
  origin: (origin:any, callback:any) => {
    if (whitelist.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
};

app.use(cors(corsOptions));

app.use(express.json());          

// Health check 
app.get('/health', (_req, res) => res.json({ ok: true }));    

// Initialize routes
await initRoutes();
app.use(router);                  

app.use((_req, res) => res.status(404).json({ error: 'Not Found' })); 
app.use(errorMiddleware);                                     

async function bootstrap() {                                  
  await initDB();                                             

  await sequelize.sync({ alter: false }); // Sync models with alter false because we use migrations

  // Start server
  app.listen(ENV.PORT, () => {                                
    console.log(`🚀 Server on http://localhost:${ENV.PORT}`);
  });
}

bootstrap().catch((e) => {                                    
  console.error('Fatal start error:', e);
  process.exit(1);
});
