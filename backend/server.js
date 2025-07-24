import express from 'express';
     import taskRoutes from './routes/taskRoutes.js';
     import dotenv from 'dotenv';
     import cors from 'cors';

     dotenv.config();

     const app = express();
     app.use(cors());
     app.use(express.json());

     app.use('/api/tasks', taskRoutes);

     const PORT = process.env.PORT || 8000;
     app.listen(PORT, () => {
       console.log(`Server running on port ${PORT}`);
     });

     export default app;