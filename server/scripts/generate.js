const { secp256k1 } = require("ethereum-cryptography/secp256k1.js");
const { keccak256 } = require("ethereum-cryptography/keccak");
const { toHex } = require("ethereum-cryptography/utils");

const  privateKey = secp256k1.utils.randomPrivateKey();
console.log("privateKey : ", toHex(privateKey));

const publicKey = secp256k1.getPublicKey(privateKey);
console.log("publicKey : ", toHex(publicKey));

const address = keccak256(publicKey.slice(1)).slice(-20);
console.log("address : ", toHex(address));


//pre generated publicKeys, privateKeys and addresses:

// privateKey :  c73cbaa87705e50151ce6dafa32bb9ca044e6bd473d76084d241c45671351d41
// publicKey :  038f14513e828f6d22c5219f54ca10d7460cc185eedf9b5ef5766cbe9d6270224b
// address :  807def5e86700b86d22cdc2e95e42302ec9b646a

// privateKey :  a24d21dcb7f6ba4a4771136d8d4dc238bfba8007d8dca050db9bbcd9040c6a44
// publicKey :  0391e3762671662e420ea10dea9c90a735fd360c4b591c95c491c28f6b3202c035
// address :  aa0331b89831775df56e7d97c7545691025d49b5

// privateKey :  076676d654d5e5c90028ef01e9e09a487e8ec1de023ac1cd71208c2e1e31b95b
// publicKey :  0317e8b0043a1b3efd36effd545e377936f82ce6223d8bcce3fba771d33b906af8
// address :  72a5153ac01e802b5e3e15ef5d83e96daf4ceb22