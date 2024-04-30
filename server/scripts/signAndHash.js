const { secp256k1 } = require("ethereum-cryptography/secp256k1.js");
const { keccak256 } = require("ethereum-cryptography/keccak");
const { toHex, utf8ToBytes } = require("ethereum-cryptography/utils");


// To complete the transaction, follow the steps below:
// 1. update privateKey and contents of the message object below and save the file
// 2. run node scripts/signAndHash.js        
// 3. copy the publicKey, recoveryBit and signature from the console output
// 4. paste the values into the client side-form to corresponding fields and complete the transaction

const privateKey = "c73cbaa87705e50151ce6dafa32bb9ca044e6bd473d76084d241c45671351d41"
const message = {
    sender: "807def5e86700b86d22cdc2e95e42302ec9b646a",
    amount: 25,
    recipient: "aa0331b89831775df56e7d97c7545691025d49b5"
}

const messageHash = keccak256(utf8ToBytes(JSON.stringify(message)));

const publicKey = secp256k1.getPublicKey(privateKey);
console.log(" 1 - Public Key : ", toHex(publicKey));

const signature = secp256k1.sign(messageHash, privateKey);

const recoveryBit = signature.recovery;
console.log(" 2 - Recovery Bit : ", recoveryBit);

const signatureHex = signature.toCompactHex();
console.log(" 3 - Signature : ", signatureHex);



