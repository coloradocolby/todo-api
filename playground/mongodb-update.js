// const MongoClient = require('mongodb').MongoClient;
const { MongoClient, ObjectID } = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
  if (err) {
    // using return here will call this line and then end the function
    return console.log('Unable to connect to MongoDb server', err);
  }
  console.log('Connected to MongoDb server');
  const db = client.db('TodoApp');

  // db.collection('Todos').findOneAndUpdate({
  //   _id: new ObjectID('5b63a48e035a6fc89669709f')
  // }, {
  //     $set: {
  //       completed: true
  //     }
  //   }, {
  //     returnOriginal: false
  //   }).then((result) => {
  //     console.log(result);
  //   });

  db.collection('Users').findOneAndUpdate({
    _id: new ObjectID('5b6399110477e2088260677b')
  }, {
      $inc: {
        age: 1
      },
      $set: {
        name: 'Michelle'
      }
    }, {
      returnOriginal: false
    }).then((result) => {
      console.log(result);
    });

  client.close();
});