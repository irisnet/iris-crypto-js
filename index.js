const Crypto = require("./src/crypto");
const Builder = require("./src/builder").Builder;
const config = require('./config');
const Codec = require('./src/util/codec');

function getBuilder(chainName,network){
    setNetwork(network);
    return Builder.getBuilder(chainName)
}

function getCrypto(chainName,network){
    setNetwork(network);
    return Crypto.getCrypto(chainName)
}

function setNetwork(network){
    if(network && network === 'testnet'){
        config.iris.bech32 = {
            accAddr: "faa",
            valAddr: "fva",
            accPub: "fap"
        };
    }else {
        config.iris.bech32 = {
            accAddr: "iaa",
            valAddr: "iva",
            accPub: "iap"
        };
    }
    return config
}
module.exports = {getCrypto,getBuilder,config,Codec};