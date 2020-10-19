require('dotenv/config');
const express = require('express');
const Crypto = require('crypto');

function randomString(size = 21) {
  return Crypto
    .randomBytes(size)
    .toString('hex')
    .slice(0, size);
}

const db = require('./database');
const ClientError = require('./client-error');
const staticMiddleware = require('./static-middleware');
const sessionMiddleware = require('./session-middleware');

const app = express();

app.use(staticMiddleware);
app.use(sessionMiddleware);

app.use(express.json());

app.get('/api/health-check', (req, res, next) => {
  db.query('select \'successfully connected\' as "message"')
    .then(result => res.json(result.rows[0]))
    .catch(err => next(err));
});

app.get('/api/git-auth', (req, res, next) => {
  const { user } = req.query;
  const { GITHUB_CLIENT_ID, GITHUB_REDIRECT_URI } = process.env;
  const randomSecret = randomString();
  const query = `state=${randomSecret}` +
                `&login=${user}` +
                `&client_id=${GITHUB_CLIENT_ID}` +
                `&redirect_uri=${GITHUB_REDIRECT_URI}`;
  res.redirect(`https://github.com/login/oauth/authorize?${query}`);
});

app.get('/api/token', (req, res, next) => {
  const { code, state } = req.query;
  const { GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET, HOME_REDIRECT_URI } = process.env;
  const query = `state=${state}` +
                `&code=${code}` +
                `&client_id=${GITHUB_CLIENT_ID}` +
                `&client_secret=${GITHUB_CLIENT_SECRET}` +
                `&redirect_uri=${HOME_REDIRECT_URI}`;
  res.redirect(`https://github.com/login/oauth/access_token?${query}`);
});

app.use('/api', (req, res, next) => {
  next(new ClientError(`cannot ${req.method} ${req.originalUrl}`, 404));
});

app.use((err, req, res, next) => {
  if (err instanceof ClientError) {
    res.status(err.status).json({ error: err.message });
  } else {
    console.error(err);
    res.status(500).json({
      error: 'an unexpected error occurred'
    });
  }
});

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log('Listening on port', process.env.PORT);
});
