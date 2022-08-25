const Web3 = require('web3');
const Tx  = require('ethereumjs-tx').Transaction;
const web3 = new Web3('https://rinkeby.infura.io/v3/40da9eaecc81492b857410895f936859');

const account1 = '0x8fec508835af1F7bBf3184E13D67A51Bb2125752';
const privatekey1 = Buffer.from('caded0f72309948cfe554b70b6a4309156b0832673b92ccdc405f10ad219331d','hex');
const data = '0x608060405234801561001057600080fd5b50610150806100206000396000f3fe608060405234801561001057600080fd5b50600436106100365760003560e01c80632e64cec11461003b5780636057361d14610059575b600080fd5b610043610075565b60405161005091906100d9565b60405180910390f35b610073600480360381019061006e919061009d565b61007e565b005b60008054905090565b8060008190555050565b60008135905061009781610103565b92915050565b6000602082840312156100b3576100b26100fe565b5b60006100c184828501610088565b91505092915050565b6100d3816100f4565b82525050565b60006020820190506100ee60008301846100ca565b92915050565b6000819050919050565b600080fd5b61010c816100f4565b811461011757600080fd5b5056fea26469706673582212209a159a4f3847890f10bfb87871a61eba91c5dbf5ee3cf6398207e292eee22a1664736f6c63430008070033';

web3.eth.getTransactionCount(account1,(err,txCount)=>{
    // Create transaction Object
    const txObject = {
        nonce: web3.utils.toHex(txCount),
        gasLimit: web3.utils.toHex(100000000),
        gasPrice: web3.utils.toHex(web3.utils.toWei('10','gwei')),
        data : data
    }
    
    //Sign Transaction
    const tx = new Tx(txObject,{chain: 'rinkeby'});
    tx.sign(privatekey1);
    const serialized = tx.serialize();
    const raw = '0x' + serialized.toString('hex');

    // Broadcast the Transaction

    web3.eth.sendSignedTransaction(raw, (err,txHash)=>{
        console.log(txHash);
    });

})

// const contractabi = [
// 	{
// 		"inputs": [],
// 		"name": "retrieve",
// 		"outputs": [
// 			{
// 				"internalType": "uint256",
// 				"name": "",
// 				"type": "uint256"
// 			}
// 		],
// 		"stateMutability": "view",
// 		"type": "function"
// 	},
// 	{
// 		"inputs": [
// 			{
// 				"internalType": "uint256",
// 				"name": "num",
// 				"type": "uint256"
// 			}
// 		],
// 		"name": "store",
// 		"outputs": [],
// 		"stateMutability": "nonpayable",
// 		"type": "function"
// 	}
// ] ;
// const tAddress = '0xcc208b0ba25E4c8Dd9A3d48068f7d6a612634801';
// const contract = new web3.eth.Contract(contractabi,tAddress);
// contract.methods.retrieve.call();