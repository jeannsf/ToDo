import express from 'express';
import cors from 'cors';
import todoRoutes from './src/routes/todoRoutes';
import userRoutes from './src/routes/userRoutes';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerOptions from './src/swaggerOptions';

const PORT: number = Number(process.env.PORT) || 8000;
const app = express();

app.use(cors());
app.use(express.json());

const specs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

app.use('/todos', todoRoutes);
app.use('/', userRoutes);

app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));