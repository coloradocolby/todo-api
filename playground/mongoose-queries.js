const { ObjectID } = require('mongodb');

const { mongoose } = require('./../server/db/mongoose');
const { Todo } = require('./../server/models/todo');
const { User } = require('./../server/models/user');

const todoId = '5b64e8c84fa7b1af1c56acfe';

if (!ObjectID.isValid(todoId)) {
  console.log('Id is not valid');
}

Todo.find({
  _id: todoId
}).then((todos) => {
  console.log('Todos', todos);
});

Todo.findOne({
  _id: todoId
}).then((todo) => {
  console.log('Todo', todo);
});

Todo.findById(todoId)
  .then((todo) => {
    if (!todo) {
      return console.log('Id not found');
    }
    console.log('Todo By Id', todo);
  })
  .catch((e) => console.log(e));

const userId = '5b63b20bdde51d7212e7cb4c';

if (!ObjectID.isValid(userId)) {
  console.log('Id is not valid');
}

User.findById(userId)
  .then((user) => {
    if (!user) {
      return console.log('User not found')
    }
    console.log('User', user);
    // right here I'm opting to use second callback to catch error rather than attaching .catch to promise chain
  }, (e) => {
    console.log(e);
  });