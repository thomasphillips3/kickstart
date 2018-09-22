const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('Web3');
const compiledFactory = require('./build/CampaignFactory.json');

const MNEMONIC = 'verify view whale gloom slow squeeze despair addict return rotate guard young';
const RINKEBY = 'https://rinkeby.infura.io/v3/e31498c5186145d4a7fcc4da25794703';

const provider = new HDWalletProvider(
    MNEMONIC,
    RINKEBY
);
const web3 = new Web3(provider);

const deploy = async () => {
    const accounts = await web3.eth.getAccounts();
    console.log('Deploying from ', accounts[0]);
    const result = await new web3.eth.Contract(JSON.parse(compiledFactory.interface))
        .deploy({ data: '0x' + compiledFactory.bytecode })
        .send({ from: accounts[0], gas: '1000000' });
    console.log('Deployed to ', result.options.address);
};

deploy();
