require('dotenv').config();
const express = require('express'),
  bodyParser = require('body-parser'),
  massive = require('massive'),
  path = require('path'),
  rateLimit = require('express-rate-limit'),
  cors = require('cors'),
  compression = require('compression'),
  routes = require('./routes'),
  port = process.env.PORT || 8080;

const app = express();
app.use(bodyParser.json());
app.use(cors());

// compress all responses
app.use(compression())

app.use(express.static(`${__dirname}/../build`));

const db_url = process.env.CONNECTION_STRING

massive(db_url)
  .then(db => {
    app.set('db', db);
    console.log('DB connection OK')
  })
  .catch(err => {
    console.log('Database connection error', err);
  });


const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10000
});

app.use(limiter);

routes(app);

// run build
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../build/index.html'));
});

app.listen(port, () => {
  console.log(`Listening on port: ${port}`);
});
