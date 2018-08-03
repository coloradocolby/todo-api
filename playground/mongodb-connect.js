// const MongoClient = require('mongodb').MongoClient;
const { MongoClient, ObjectID } = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
  if (err) {
    // using return here will call this line and then end the function
    return console.log('Unable to connect to MongoDb server', err);
  }
  console.log('Connected to MongoDb server');
  const db = client.db('TodoApp');

  // db.collection('Todos').insertOne({
  //   text: 'Write a song',
  //   completed: false
  // }, (err, result) => {
  //   if (err) {
  //     return console.log('Unable to insert todo', err);
  //   }

  //   console.log(JSON.stringify(result.ops, undefined, 2));
  // });

  // db.collection('Users').insertOne({
  //   name: 'Colby',
  //   age: 24,
  //   location: 'Dallas, TX'
  // }, (err, result) => {
  //   if (err) {
  //     return console.log('Unable to insert todo', err);
  //   }

  //   console.log(result.ops[0]._id.getTimestamp());
  // });

  client.close();
});