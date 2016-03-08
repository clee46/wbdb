var chai = require('chai');
var chaiHTTP = require('chai-http');
chai.use(chaiHTTP);
var mongoose = require('mongoose');
var expect = chai.expect;

process.env.MONGO_URI = 'mongodb://localhost/app_dev';

const server = require(__dirname + '/../server.js');
const User = require(__dirname + '/../models/user.js');
var baseUri = 'localhost:3000';

describe('the authorization route', () => {
  after((done) => {
    User.remove({}, (err) => {
      if (err) console.log(err);
      done();
    });
  });
  it('should create a new user with a POST request', (done) => {
    chai.request(baseUri)
      .post('/api/signup')
      .send({ 'email': 'notify@codefellows.com', 'password': 'password' })
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('token');
        expect(res.body).to.have.property('user');
        done();
      });
  });
  describe('rest requests that require an existing user in the DB', () => {
    beforeEach((done) => {
      var newUser = new User();
      newUser.authentication.email = 'chris@gmail.com';
      newUser.hashPassword('password');
      newUser.save((err, data) => {
        if (err) console.log(err);
        this.userToken = data.generateToken();
        this.userId = data._id;
        done();
      });
    });
    it('should check if the user has valid credentials', (done) => {
      chai.request(baseUri)
        .get('/api/signin')
        .auth('chris@gmail.com', 'password')
        .end((err, res) => {
          expect(err).to.eql(null);
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('token');
          expect(res.body).to.have.property('user');
          done();
        });
    });
    // it('should be able to update a user', (done) => {
    //   chai.request(baseUri)
    //     .put('/auth/update/' + this.userId)
    //     .set('token', this.userToken)
    //     .send({authentication: {email: "notefellows@codefellows.com", password: "8675309"}})
    //     .end((err, res) => {
    //       expect(err).to.eql(null);
    //       expect(res).to.have.status(200);
    //       expect(res.body.msg).to.eql('User updated');
    //       done();
    //     });
    // });

    after((done) => {
      mongoose.connection.db.dropDatabase(done);
    });
  });

  after((done) => {
    server.close(done);
  });
});
