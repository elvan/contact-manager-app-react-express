const dotenv = require('dotenv');
const express = require('express');

const connectToDatabase = require('./backend/database/connect');
const errorHandler = require('./backend/middleware/errorHandler');

const contactRouter = require('./backend/routers/contactRouter');
const userRouter = require('./backend/routers/userRouter');

dotenv.config();
connectToDatabase();

const NODE_ENV = process.env.NODE_ENV || 'development';
const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/contacts', contactRouter);
app.use('/api/users', userRouter);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running in ${NODE_ENV} mode on port ${PORT}`);
});
