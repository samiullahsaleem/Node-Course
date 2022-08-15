const express = require('express');
const Web3 = require('web3');
const web3 = new Web3('https://mainnet.infura.io/v3/9e4377c2a0e9455582e6283f9e4f581d');
const app = express();
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.get('/', (req, res) => {
    res.sendFile('/index.html', {root: __dirname });    
    
});
app.post('/wallet', (req, res) => {
    const address = req.body.wallet;
    web3.eth.getBalance(address,(err,bal)=>{balance = bal;web3.utils.fromWei(balance,'ether');res.send(balance);});

});

app.listen(3000, () => console.log('Example app is listening on port 3000.'));