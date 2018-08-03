// const MongoClient = require('mongodb').MongoClient;
const { MongoClient, ObjectID } = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
  if (err) {
    // using return here will call this line and then end the function
    return console.log('Unable to connect to MongoDb server', err);
  }
  console.log('Connected to MongoDb server');
  const db = client.db('TodoApp');

  // .find() returns a cursor, or a pointer to the docs, .toArray() returns the actual docs in a promise
  // db.collection('Todos').find({
  //   _id: new ObjectID('5b6398a28aa69f0864e2f162')
  // }).toArray().then((docs) => {
  //   console.log('Todos');
  //   console.log(JSON.stringify(docs, undefined, 2));
  // }, (err) => {
  //   console.log('Unable to fetch todos', err);
  // });

  // db.collection('Todos').find().count().then((count) => {
  //   console.log(`Todos count: ${count}`);
  // }, (err) => {
  //   console.log('Unable to fetch todos', err);
  // });

  db.collection('Users').find({ name: 'Michelle' }).toArray().then((docs) => {
    // console.log(JSON.stringify(docs, undefined, 2));
    console.log(docs);
  }, (err) => {
    console.log('err', err);
  })

  client.close();
});