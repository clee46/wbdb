const chai = require('chai');
const expect = chai.expect;
chai.use(require('chai-http'));

process.env.MONGO_URI = 'mongodb://localhost/app_dev_test';

const server = require(__dirname + '/../server.js');
const User = require(__dirname + '/../models/user.js');
const baseUri = 'localhost:4000';

describe('the authorization route', () => {
  before((done) => {
    this.server = server(4000, done);
  });

  it('should create a new user with a POST request', (done) => {
    chai.request(baseUri)
      .post('/api/signup')
      .send({
        'username': 'test',
        'email': 'test@example.com',
        'password': 'password',
        'confirmpassword': 'password'
      })
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('token');
        expect(res.body).to.have.property('msg');
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
          expect(res.body).to.have.property('msg');
          done();
        });
    });
  });

  after((done) => {
    this.server.close(done);
  });

  after((done) => {
    User.remove({}, (err) => {
      if (err) console.log(err);
      done();
    });
  });
});
