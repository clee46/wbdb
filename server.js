const express = require('express');
const app = express();
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/app_dev');

const challengeRouter = require(__dirname + '/routes/challenge_routes');
const authRouter = require(__dirname + '/routes/auth_routes');
const userRouter = require(__dirname + '/routes/user_routes');
const adminRouter = require(__dirname + '/routes/admin_routes');
const favoriteRouter = require(__dirname + '/routes/favorite_routes');

app.use('/api', challengeRouter);
app.use('/api', authRouter);
app.use('/api', userRouter);
app.use('/api', adminRouter);
app.use('/api', favoriteRouter);
app.use(express.static(__dirname + '/build'));
app.use((req, res, next) => {
  res.redirect('/#', req.url);
  next();
});

const PORT = process.env.PORT || 3000;
module.exports = exports = (port, cb) => {
  return app.listen(port || PORT,
    cb || (() => console.log('Server running on Port: ' + PORT)));
};
