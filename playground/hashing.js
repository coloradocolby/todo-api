const { SHA256 } = require('crypto-js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

var password = 'Password';

// console.log(password);

// bcrypt.genSalt(10, (err, salt) => {
//   console.log(salt);

// });

// bcrypt.hash(password, '$2a$10$JhvGHBLAK4ut7201Isn3i.', (err, hash) => {
//   console.log(hash);
// });

var salt = bcrypt.genSaltSync(10);
console.log(salt);
var hash = bcrypt.hashSync(password, salt);
console.log(hash);
var isSame = bcrypt.compareSync(password, hash);
console.log(isSame);

// var isSamePassword = bcrypt.compareSync(password, bcrypt.hashSync(password, bcrypt.genSaltSync(10)));
// console.log(isSamePassword);

// console.log(password);
// bcrypt.genSalt(10, (err, salt) => {
//   console.log(salt);
//   bcrypt.hash(password, salt, (err, hash) => {
//     console.log(hash);
//     bcrypt.compare(password, hash, (err, success) => {
//       err ? console.log(err) : console.log(success)
//     });
//   });
// });

// bcrypt.genSalt(10, (err, salt) => {
//   console.log(salt);
// })

// bcrypt.hash('Password123', '$2a$10$poNglHXb0gCMhm0vXY1Sie', (err, hash) => {
//   console.log(hash);
// });

// bcrypt.compare('Password123', '$2a$10$poNglHXb0gCMhm0vXY1SiermRWY1CGcb0AX7FIPiGNxoI27953crm', (err, success) => {
//   console.log(success);
// })

// bcrypt.genSalt(10, (err, salt) => {
//   console.log(`Original: ${password}`);
//   console.log(`Salt: ${salt}`);
// bcrypt.hash(password, 'abc123', (err, hash) => {
// console.log(`Hash: ${hash}`);
// var blah = bcrypt.hash('string', 'salt');
// bcrypt.compare(password, '$2a$10$cZh2/fFtTeaBgYgbVxYZi.oV6r0sC6ecO1.5ucpveCUP/5DLaru6q', (err, res) => {
//   console.log(`Valid password: ${res}`);
// });
// });
// });


// var password = '123abc!';
// bcrypt.genSalt(10, (err, salt) => {
//   bcrypt.hash(password, salt, (err, hash) => {
//     console.log(hash);
//     hashedPassword = hash;
//   });
// });
// var hashedPassword = '$2a$10$03ymLy7HafWrHmmZCK30u.UA2Fq7Yrw22vwoya2B/CAXvMgwjP.ci';
// bcrypt.compare('123abc!', hashedPassword, (err, res) => {
//   console.log(res);
// });


/* 
var data = {
  id: 777
};

var token = jwt.sign(data, '123abc');
console.log(token);

// only when the token is unaltered and the secret is the same will we know the verification passed
var decoded = jwt.verify(token, '123abc');
console.log(decoded);

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