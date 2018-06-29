const express = require('express');
const bodyParser = require('body-parser');

const BlockChain = require('../blockchain');
const Wallet = require('../wallet');
const TransactionPool = require('../wallet/transaction-pool');
const P2pServer = require('./p2p-server');
const HTTP_PORT = process.env.HTTP_PORT || 3001;

const app = express();
app.use(bodyParser.json());

const bc = new BlockChain();
const wallet = new Wallet();
const tp = new TransactionPool();
const p2pServer = new P2pServer(bc, tp);

app.get('/blocks', (req, res)=>{
    res.statusCode = 200;
    res.json(bc.chain);
});

app.post('/mine', (req,res) => {
    const block = bc.addBlock(req.body.data);
    console.log(`New block added ${block.toString()}`);
    
    p2pServer.syncChain();
    
    res.redirect('/blocks');
});

app.get('/transaction', (req, res)=>{
    res.json(tp.transactions);
});

app.post('/transact', (req, res)=>{
    const { recipient, amount } = req.body;
    const transaction = wallet.createTransaction(recipient, amount, tp);
    p2pServer.broadCastTransaction(transaction);
    res.redirect('/transaction');
});

app.get('/public-key', (req, res)=>{
    res.json({publicKey: wallet.publicKey});
});

app.listen(HTTP_PORT, ()=> {
    console.log(`Listening at port ${HTTP_PORT}`);
});
p2pServer.listen();