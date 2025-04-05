import express from 'express';
import rankRoutes from './routes/rankRoutes';
import { errorHandler } from './middlewares/errorHandler';

const app = express();

app.use(express.json());

// Routes
app.use('/api/rank', rankRoutes);

// Global error handler (should be after routes)
app.use(errorHandler);

export default app;
