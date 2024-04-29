const { secp256k1 } = require("ethereum-cryptography/secp256k1.js");
const { keccak256 } = require("ethereum-cryptography/keccak");
const { toHex, utf8ToBytes } = require("ethereum-cryptography/utils");

const privateKey = "c73cbaa87705e50151ce6dafa32bb9ca044e6bd473d76084d241c45671351d41"

const message = {
    address: "807def5e86700b86d22cdc2e95e42302ec9b646a",
    amount: 100,
    recepient: "aa0331b89831775df56e7d97c7545691025d49b5"
}

const messageHash = keccak256(utf8ToBytes(JSON.stringify(message)));
console.log(" 1 - messageHash : ", toHex(messageHash));

const publicKey = secp256k1.getPublicKey(privateKey);
console.log(" 2 - publicKey : ", toHex(publicKey));

const signature = secp256k1.sign(messageHash, privateKey);
//console.log("signature : ", signature);

const recoveryBit = signature.recovery;
console.log(" 3 - recoveryBit : ", recoveryBit);

const signatureHex = signature.toCompactHex();
console.log(" 4 - signature COMPACT Hex : ", signatureHex);

const signatureObj = secp256k1.Signature.fromCompact(signatureHex); 
console.log(" 6 - Signature Obj with missing recovery bit : ", signatureObj);

const signatureFromHex = signatureObj.addRecoveryBit(recoveryBit); 
console.log(" 7 - Complete Signature Obj with recovery bit : ", signatureFromHex);

const recoveredPublicKey= signatureFromHex.recoverPublicKey(messageHash).toRawBytes();
console.log(" 8 - Recovered PublicKey from Signature : ", toHex(recoveredPublicKey));



