const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const tokenRouter = require('./routes/token');
const walletRouter = require('./routes/wallet');
const tokenVerification = require('./middleware/tokenVerification');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(tokenVerification);

app.use('/api/token', tokenRouter);
app.use('/api/wallet', walletRouter);

module.exports = app;
