const express = require('express');

const todoRouter = require('./router/todo');

const app = express();

app.use(express.json());
app.use(express.static('public'));

app.use('/api', todoRouter);

app.get('/', (req, res) => {
  res.status(200).send('index.html');
});

app.listen(3000);