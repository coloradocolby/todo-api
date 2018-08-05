require('./config/config');
const express = require('express');
const bodyParser = require('body-parser');
const { ObjectID } = require('mongodb');
const _ = require('lodash');
const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');

const { mongoose } = require('./db/mongoose');
const { authenticate } = require('./middleware/authenticate');
const { Todo } = require('./models/todo');
const { User } = require('./models/user');

const app = express();
const port = process.env.PORT;

app.use(bodyParser.json()); // we can now send json to our express app

// tells express where you want static files to be found
// server.log in the public folder will be accessible @ localhost:3000/server.log 
// NOTE: because we're not using __dirname, it's looking for the 'public' folder at the root level
// app.use(express.static('public'));

process.env.PWD = process.cwd();
app.use(express.static(path.join(process.env.PWD, 'public')));

// alternatively I could write the following and my server.log would be accessible @ localhost:3000/static/server.log
// app.use('/static', express.static('public'));

// Server Logging Middlware
app.use((req, res, next) => {
  const log = `${new Date().toString()}: ${req.method} ${req.url} \n`;

  fs.appendFile(path.join(process.env.PWD, 'public', 'server.log'), log, (err) => {
    if (err) {
      console.log('Unable to append to server.log', err);
    }
  });
  next();
});

app.post('/todos', (req, res) => {
  const todo = new Todo({
    text: req.body.text,
  });
  // save model to db
  todo.save().then((todoDoc) => {
    res.send(todoDoc);
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
  const { id } = req.params;
  // we don't want the user to be able to update just anything, 
  // so we use lodash's pick method to grab a subset of what the
  // user sent us (only things they are allowed to update)
  const body = _.pick(req.body, ['text', 'completed']);

  if (body.text === '') {
    return res.status(400).send({
      error: 'Text cannot be blank!'
    });
  }
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

app.post('/users', (req, res) => {
  var body = _.pick(req.body, ['email', 'password']);

  // const user = new User({
  //   email: body.email,
  //   password: body.password
  // });

  // COULD ALSO USE THE FOLLOWING:
  var user = new User(body);

  // save model to db
  user.save().then((user) => {
    return user.generateAuthToken();
  }).then((token) => {
    res.header('x-auth', token).send(user);  // an 'x-' header is a custom header
  }).catch((e) => {
    res.status(400).send(e);
  });
});

app.get('/users', (req, res) => {
  User.find().then((users) => {
    res.send({ users });
  }, (e) => {
    res.status(400).send(e);
  });
});

app.get('/users/me', authenticate, (req, res) => {
  res.send(req.user);
});

app.post('/users/login', (req, res) => {
  const body = _.pick(req.body, ['email', 'password']);

  User.findByCredentials(body.email, body.password).then((user) => {
    // we use 'return' here so that if we fail we will hit the catch below
    return user.generateAuthToken().then((token) => {
      res.header('x-auth', token).send(user);
    });
  }).catch((e) => {
    res.status(400).send();
  });
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

module.exports = { app };