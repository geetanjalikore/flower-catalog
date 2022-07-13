const request = require('supertest');
const { app } = require('../src/app.js');

const config = {
  path: './public',
  guestbook: './test/resources/comments.json',
  templateFile: './test/resources/guestBookTemplate.html',
  userCredentialsPath: './test/resources/creadentials.json'
};

const sessions = {
  '1': {
    id: 1,
    username: 'abin',
    date: new Date().toLocaleString()
  }
};

let router;
beforeEach(() => router = app(config, sessions));

describe('GET /', () => {
  it('Should respond with index.html', (done) => {
    request(router)
      .get('/')
      .set('cookie', 'id=1')
      .expect(200)
      .expect('content-type', /html/)
      .end((err, res) => {
        if (err) throw err;
        done();
      });
  });

  it('Should respond with Unauthorized access', (done) => {
    request(app(config, {}))
      .get('/')
      .expect('Access Denied !!! Login to access the flower-catalog')
      .expect(401, done);
  });
});

describe('GET /abeliophyllum.html', () => {
  it('Should respond with abeliophyllum.html', (done) => {
    request(router)
      .get('/abeliophyllum.html')
      .set('cookie', 'id=1')
      .expect(200, done);
  });
});

describe('GET /ageratum.html', () => {
  it('Should respond with ageratum.html', (done) => {
    request(router)
      .get('/ageratum.html')
      .set('cookie', 'id=1')
      .expect(200, done);
  });
});

describe('GET /guestbook.html', () => {
  it('Should respond with guestbook.html', (done) => {
    request(router)
      .get('/guestbook.html')
      .set('cookie', 'id=1')
      .expect(200, done);
  });
});

describe('GET /unknown', () => {
  it('Should respond with Not found', (done) => {
    request(router)
      .get('/unknown')
      .set('cookie', 'id=1')
      .expect(404, done);
  });
});

describe('GET /comments', () => {
  it('Should respond with all comments in json format', (done) => {
    request(router)
      .get('/comments')
      .set('cookie', 'id=1')
      .expect('content-type', /json/)
      .expect(200, done);
  });

  it('Should add comment ', (done) => {
    request(router)
      .post('/add-comment')
      .send('comment=nice')
      .set('cookie', 'id=1')
      .expect(201, done);
  });
});

describe('GET /login ', () => {
  it('Should respond with login page', (done) => {
    request(app(config, sessions))
      .get('/login')
      .expect(200)
      .expect('content-type', /html/, done);
  });
})

describe('POST /login - Registered User', () => {
  it('Should respond with index.html', (done) => {
    request(router)
      .post('/login')
      .send('username=geets&password=abcd')
      .expect(302)
      .expect('Location', '/index.html', done);
  });

  it('POST /login - Unregistered User', (done) => {
    request(app(config, {}))
      .post('/login')
      .send('username=abin&password=raphel')
      .expect('Please register your details')
      .expect(401, done)
  });
});
