const express = require('express');
const User = require(__dirname + '/../models/user');
const jsonParser = require('body-parser').json();
const handleDBError = require(__dirname + '/../lib/handle_db_error');
const basicHTTP = require(__dirname + '/../lib/basic_http');
const saveUserDB = require(__dirname + '/../lib/save_new_user');
const emailValidation = require(__dirname + '/../lib/email_validation.js');

const authRouter = module.exports = exports = express.Router();

authRouter.post('/signup', jsonParser, (req, res) => {

  if (!(req.body.email || '').length && !emailValidation(req.body.email)) {
    return res.status(400).json({ msg: 'Please enter an email' });
  }

  if (!emailValidation(req.body.email)) {
    return res.status(400).json({ msg: 'Please enter a valid email' });
  }

  if (!(req.body.username || '').length) {
    return res.status(400).json({ msg: 'Please enter a user name' });
  }

  if (!((req.body.password || '').length > 7)) {
    return res.status(400)
      .json({ msg: 'Please enter a password longer than 7 characters' });
  }

<<<<<<< HEAD
<<<<<<< HEAD
  if (!(req.body.password === req.body.comfirmpassword)) {
    return res.status(400).json({ msg: 'Passwords are not the same' });
  }
=======
  if (!(req.body.password === req.body.confirmpassword)) return res.status(400).json( { msg: 'Passwords are not the same' } );
>>>>>>> added auth_routes tests and setup challenge routes test file
=======
  if (!(req.body.password === req.body.confirmpassword)) return res.status(400).json( { msg: 'Passwords are not the same' } );
>>>>>>> 7c36de8b3a18fa65a1a433ee6c0b1dcd61056afc

  User.find({
    $or: [{ 'username': req.body.username }, { 'email': req.body.email }]
  }, (err, data) => {
    if (err) return handleDBError(err, res);
    if (data.length) {
      return res.status(400)
        .json({ msg: 'User already exists! Please use a different username' });
    }
    saveUserDB(req, res);
  });
});

authRouter.get('/signin', basicHTTP, (req, res) => {

  User.findOne({ 'authentication.email': req.basicHTTP.email }, (err, user) => {

    if (err) return handleDBError(err, res);

    if (!user) return res.status(401).json({ msg: 'no user exists' });

    if (!user.comparePassword(req.basicHTTP.password)) {
      return res.status(401).json({ msg: 'incorrect password' });
    }

    res.json({ msg: 'Success in signin', token: user.generateToken() });
  });
});
