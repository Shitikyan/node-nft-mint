const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const tokenRouter = require('./routes/token');
const walletRouter = require('./routes/wallet');
const nftFactoryContractRouter = require('./routes/nft_factory_contract');
const nftContractRouter = require('./routes/nft_contract');
const erc20FactoryContractRouter = require('./routes/erc20_factory_contract');
const erc20ContractRouter = require('./routes/erc20_contract');
const dataVaultContractRouter = require('./routes/datavault');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/token', tokenRouter);
app.use('/api/wallet', walletRouter);

app.use('/api/nft/factory', nftFactoryContractRouter);
app.use('/api/nft/contract', nftContractRouter);

app.use('/api/erc20/factory', erc20FactoryContractRouter);
app.use('/api/erc20/contract', erc20ContractRouter);

app.use('/api/datavault', dataVaultContractRouter);

module.exports = app;
