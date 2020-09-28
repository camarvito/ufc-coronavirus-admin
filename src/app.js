const express = require('express');
const cors = require('cors');

const userRouter = require('./routes/userRoutes');
const placeRouter = require('./routes/placeRoutes');
const actionRouter = require('./routes/actionRoutes');
const needRouter = require('./routes/needRoutes');

const app = express();

// Implement CORS
app.use(cors());

app.options('*', cors());

app.use(express.json());

app.use('/api/v1/users', userRouter);
app.use('/api/v1/places', placeRouter);
app.use('/api/v1/actions', actionRouter);
app.use('/api/v1/needs', needRouter);

module.exports = app;
