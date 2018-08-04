const express = require('express');
const bodyParser = require('body-parser');
const { ObjectID } = require('mongodb');
const _ = require('lodash');

const { mongoose } = require('./db/mongoose');
const { Todo } = require('./models/todo');
const { User } = require('./models/user');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json()); // we can now send json to our express app

app.post('/todos', (req, res) => {
  var todo = new Todo({
    text: req.body.text,
  });
  // save model to db
  todo.save().then((doc) => {
    res.send(doc);
  }, (e) => {
    res.status(400).send(e);
  });
});

app.get('/todos', (req, res) => {
  Todo.find().then((todos) => {
    res.send({ todos });
  }, (e) => {
    res.status(400).send(e);
  });
});

app.get('/todos/:id', (req, res) => {
  if (!ObjectID.isValid(req.params.id)) {
    res.status(404).send({
      error: 'Invalid ID was sent'
    });
  }
  Todo.findById(req.params.id)
    .then((todo) => {
      if (!todo) {
        return res.status(404).send();
      }
      res.send({ todo });
    }, (e) => {
      res.status(400).send();
    });
});

app.delete('/todos/:id', (req, res) => {
  const { id } = req.params;
  if (!ObjectID.isValid(id)) {
    return res.status(404).send({
      error: 'Invalid ID was sent'
    });
  }
  Todo.findByIdAndRemove(id)
    .then((todo) => {
      if (!todo) {
        return res.status(404).send();
      }
      res.send({ todo });
    }, (e) => {
      res.status(400).send();
    });
});

app.patch('/todos/:id', (req, res) => {
  var { id } = req.params;
  // we don't want the user to be able to update just anything, 
  // so we use lodash's pick method to grab a subset of what the
  // user sent us (only things they are allowed to update)
  var body = _.pick(req.body, ['text', 'completed']);

  if (!ObjectID.isValid(id)) {
    return res.status(404).send({
      error: 'Invalid ID was sent'
    });
  }

  // update the completedAt property based off the completed property
  if (_.isBoolean(body.completed) && body.completed) {
    body.completedAt = new Date().getTime();
  } else {
    body.completed = false;
    body.completedAt = null;
  }

  // {new: true} will send back the updated todo
  Todo.findByIdAndUpdate(id, { $set: body }, { new: true }).then((todo) => {
    if (!todo) {
      return res.status(404).send();
    }
    res.send({ todo });
  }).catch((e) => {
    res.status(400).send();
  })


});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

module.exports = { app };