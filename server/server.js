const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const cors = require('cors')
const { getSecret } = require('./secrets');
const usersRoute = require('./routes/users');
const newsRoute = require('./routes/news');


mongoose.Promise = global.Promise;
mongoose.connect(getSecret('dbUri')).then(
  () => {
    console.log('Connected to mongoDB');
  },
  (err) => console.log('Error connecting to mongoDB', err)
);

const app = express();
const port = process.env.PORT || 3001;
app.use(cors())
app.use(bodyParser.json());
app.use(cookieParser());
app.use('/api/users', usersRoute);
app.use('/api/news', newsRoute);
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

module.exports = { app };
