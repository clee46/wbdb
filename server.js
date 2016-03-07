const express = require('express');
const app = express();
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/app_dev');

const challengeRouter = require(__dirname + '/routes/challenge_routes.js');
const authRouter = require(__dirname + '/routes/auth_routes.js');
const userRouter = require(__dirname + '/routes/user_routes.js');

app.use('/api', challengeRouter);
app.use('/api', authRouter);
app.use('/api', userRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log('Server running on Port: ' + PORT));
