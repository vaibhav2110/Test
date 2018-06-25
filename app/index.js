const express = require('express');
const bodyParser = require('body-parser');

const BlockChain = require('../blockchain');
const P2pServer = require('./p2p-server');
const HTTP_PORT = process.env.HTTP_PORT || 3001;

const app = express();
app.use(bodyParser.json());

const bc = new BlockChain();
const p2pServer = new P2pServer(bc);

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

app.listen(HTTP_PORT, ()=> {
    console.log(`Listening at port ${HTTP_PORT}`);
});
p2pServer.listen();