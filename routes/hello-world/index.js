// get the route
var hello = require('./');

hello.app.get('/', function (req, res) {
  res.send('hello world');
});