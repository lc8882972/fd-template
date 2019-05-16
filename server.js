
const express = require('express');

const app = express();
console.log(process.env.port);
const port = process.env.port === '' ? 8080 : process.env.port;
app.use('/static', express.static('static'))
app.use('/mock', express.static('mock'))
app.use('/', express.static('dist'))
app.listen(port, function () {
  console.log('server listen port :', port);
})
