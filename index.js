const dotenv = require('dotenv');
const express = require('express');

const contactRouter = require('./routers/contactRouter');
const userRouter = require('./routers/userRouter');

dotenv.config();

const NODE_ENV = process.env.NODE_ENV || 'development';
const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/contacts', contactRouter);
app.use('/api/users', userRouter);

app.listen(PORT, () => {
  console.log(`Server running in ${NODE_ENV} mode on port ${PORT}`);
});
