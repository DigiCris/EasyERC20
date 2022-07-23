const _name = 'PLATZI';
const _symbol = 'PZI';
const _totalSupply= 1000000;
const _decimals = 18;

ENV_NODE=require('dotenv').config();
console.log(ENV_NODE.parsed.APIKEY);


const Web3 = require('web3');
const contractFile = require('./compile');
// Initialization
const bytecode = contractFile.evm.bytecode.object;
const abi = contractFile.abi;
//const privKey = ENV_NODE.parsed.privKeyTest;
//const address = ENV_NODE.parsed.addressTest;
const privKey = ENV_NODE.parsed.privKey;
const address = ENV_NODE.parsed.address;
//const web3 = new Web3('https://speedy-nodes-nyc.moralis.io/'+ENV_NODE.parsed.APIKEY+'/polygon/mumbai');
const web3 = new Web3('https://speedy-nodes-nyc.moralis.io/'+ENV_NODE.parsed.APIKEY+'/polygon/mainnet');//https://ropsten.infura.io/v3/'+ENV_NODE.parsed.APIKEY+'');
// Deploy contract
const deploy = async () => {
   console.log('Attempting to deploy from account:', address);
const erc20 = new web3.eth.Contract(abi);
const erc20Tx = erc20.deploy({
      data: bytecode,
      arguments: [_name,_symbol,_totalSupply,_decimals],
   });


const createTransaction = await web3.eth.accounts.signTransaction(
      {
         from: address,
         data: erc20Tx.encodeABI(),
         gas: '2000000',
      },
      privKey
   );
const createReceipt = await web3.eth.sendSignedTransaction(
      createTransaction.rawTransaction
   );
   console.log('Contract deployed at address', createReceipt.contractAddress);

};
deploy();