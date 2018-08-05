const { SHA256 } = require('crypto-js');
const jwt = require('jsonwebtoken');

var data = {
  id: 777
};

var token = jwt.sign(data, '123abc');
console.log(token);

// only when the token is unaltered and the secret is the same will we know the verification passed
var decoded = jwt.verify(token, '123abc');
console.log(decoded);

/* 
var message = 'Colby Thomas';
var hashed = SHA256(message).toString();

console.log(`Message: ${message}`);
console.log(`Hash: ${hashed}`); 

var data = {
  id: 4
};

var token = {
  data,
  hash: SHA256(JSON.stringify(data) + 'somesecret').toString()
}

// I'm user 5 and mad at user 4, and I want to wipe their data

token.data.id = 5;
token.hash = SHA256(JSON.stringify(token.data)).toString();

// but I don't have the salt so it's not going to work

var resultHash = SHA256(JSON.stringify(token.data) + 'somesecret').toString();

if (resultHash === token.hash) {
  // data was not changed
  console.log('Data was not changed');
} else {
  console.log('Data was changed, do not trust!');
}

// salting a hash means adding something onto the hash that is unique that changes the value
*/