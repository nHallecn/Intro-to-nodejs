
import express from "express";

const app = express();

app.use(express.json());

import userRouter from './routes/user.route.js';
import postRouter from './routes/post.route.js';

app.use('/api/v1/posts', postRouter);
app.use('/api/v1/users', userRouter);

//example route: http://localhost:4000/api/v1/users/register

export default app;