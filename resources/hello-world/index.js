// get this resource
var hello = require('resources')(__dirname);

hello.get('/', function (req, res) {
  res.send('hello world');
});