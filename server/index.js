const { secp256k1 } = require("ethereum-cryptography/secp256k1.js");
const { keccak256 } = require("ethereum-cryptography/keccak");
const { toHex, utf8ToBytes } = require("ethereum-cryptography/utils");

const express = require("express");
const app = express();
const cors = require("cors");
const port = 3042;

app.use(cors());
app.use(express.json());

const balances = {
  "807def5e86700b86d22cdc2e95e42302ec9b646a": 100,
  "aa0331b89831775df56e7d97c7545691025d49b5": 50,
  "72a5153ac01e802b5e3e15ef5d83e96daf4ceb22": 75,
};

const publicKeys = {
  "807def5e86700b86d22cdc2e95e42302ec9b646a": "038f14513e828f6d22c5219f54ca10d7460cc185eedf9b5ef5766cbe9d6270224b",
  "aa0331b89831775df56e7d97c7545691025d49b5": "0391e3762671662e420ea10dea9c90a735fd360c4b591c95c491c28f6b3202c035",
  "72a5153ac01e802b5e3e15ef5d83e96daf4ceb22": "0317e8b0043a1b3efd36effd545e377936f82ce6223d8bcce3fba771d33b906af8",
};

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});

app.get("/publicKey/:address", (req, res) => {
  const { address } = req.params;
  const publicKey = publicKeys[address] || "";
  res.send({ publicKey });
});

app.post("/send", (req, res) => {
  const { sender, recipient, amount, publicKey, signatureHex, recoveryBit } = req.body;

  const message = {
    sender: sender,
    amount: amount,
    recipient: recipient
  }

  const messageHash = keccak256(utf8ToBytes(JSON.stringify(message)));

  const signatureObj = secp256k1.Signature.fromCompact(signatureHex);

  const signatureFromHex = signatureObj.addRecoveryBit(+recoveryBit);

  const recoveredPublicKey = signatureFromHex.recoverPublicKey(messageHash).toRawBytes();

  setInitialBalance(sender);
  setInitialBalance(recipient);

  if (publicKey == toHex(recoveredPublicKey)) {
    if (balances[sender] < amount) {
      res.status(400).send({ message: "Not enough funds!" });
    } else {
      balances[sender] -= amount;
      balances[recipient] += amount;
      res.send({ balance: balances[sender] });
    }
  } else {
    res.status(400).send({ message: "Invalid signature!" });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}
