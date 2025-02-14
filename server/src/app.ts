// src/app.ts
import express from 'express';
import cors from 'cors';
import habitsRoutes from './routes/habits';

const app = express();

app.use(express.json());
app.use(cors());

app.use('/api/habits', habitsRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Serveur démarré sur le port ${PORT}`));

