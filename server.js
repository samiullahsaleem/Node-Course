const express = require('express');
const Web3 = require('web3');
const dotenv = require('dotenv');
dotenv.config();
const getblockurl = 'https://eth.getblock.io/mainnet/?api_key=';
const web3 = new Web3(getblockurl + process.env.API_KEY);
const app = express();
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.get('/', (req, res) => {
    res.sendFile('/index.html', {root: __dirname });    
    
});
app.post('/wallet', (req, res) => {
    const address = req.body.wallet;
    web3.eth.getBalance(address,(err,bal)=>{web3.utils.toWei(bal,'finney');balance = bal;;console.log(balance);res.send(balance);});

});

app.listen(3000, () => console.log('Example app is listening on port 3000.'));