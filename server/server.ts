import express from 'express';
import cors from 'cors';
import todoRoutes from './routes/todoRoutes';
import userRoutes from './routes/userRoutes';

const PORT: number = Number(process.env.PORT) || 8000;
const app = express();

app.use(cors());
app.use(express.json());

app.use('/todos', todoRoutes);
app.use('/', userRoutes); 

app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));
