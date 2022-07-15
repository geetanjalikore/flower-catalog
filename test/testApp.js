const request = require('supertest');
const { createApp } = require('../src/app.js');

const setupRouter = (sessions) => {
  const config = {
    path: './public',
    guestbook: './test/resources/comments.json',
    templateFile: './test/resources/guestBookTemplate.html',
    usersPath: './test/resources/users.json'
  };

  const identity = (x) => x;
  return createApp(config, sessions, identity);
};

let router;

beforeEach(() => {
  const sessions = {
    '1': {
      id: 1,
      username: 'abin',
    }
  };

  router = setupRouter(sessions);
});

describe('GET /', () => {
  it('Should respond with index.html', (done) => {
    request(router)
      .get('/')
      .set('cookie', 'id=1')
      .expect(200)
      .expect('content-type', /html/, done);
  });

  it('Should respond with Unauthorized access', (done) => {
    request(setupRouter({}))
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
    request(router)
      .get('/login')
      .expect(200)
      .expect('content-type', /html/, done);
  });
})

describe('POST /login - Registered User', () => {
  it('Should respond with index.html', (done) => {
    request(router)
      .post('/login')
      .send('username=nilam&password=jadhav')
      .expect(302)
      .expect('Location', '/index.html', done);
  });

  it('POST /login - Unregistered User', (done) => {
    request(router)
      .post('/login')
      .send('username=prem&password=sharma')
      .expect('Please register your details')
      .expect(401, done);
  });
});

describe('GET /signup', () => {
  it('Should respond with signup page', (done) => {
    request(router)
      .get('/signup')
      .expect(200)
      .expect('content-type', /html/, done);
  });
});

describe('POST /signup', () => {
  it('Should register user', (done) => {
    request(router)
      .post('/signup')
      .send('username=nilam&password=jadhav')
      .expect('Registered successfully!!')
      .expect(200, done);
  });
});

describe('GET /logout', () => {
  it('Should logout user', (done) => {
    request(router)
      .get('/logout')
      .set('cookie', 'id=1')
      .expect(200)
      .expect('Logged out successfully', done);
  });
});

describe('GET /api.search', () => {
  it('Should search the comments by name', (done) => {
    request(router)
      .get('/api.search?name=abin')
      .set('cookie', 'id=1')
      .expect('content-type', /json/)
      .expect(200, done);
  });
});

describe('GET /api.comments', () => {
  it('Should respond with all comments', (done) => {
    request(router)
      .get('/api.comments')
      .set('cookie', 'id=1')
      .expect('content-type', /json/)
      .expect(200, done);
  });
});
