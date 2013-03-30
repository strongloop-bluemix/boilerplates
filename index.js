var config = require('./config.json');
var asteroid = require('asteroid');
var app = asteroid();

app.init(function (err) {
  if(err) throw err;
  
  app.use(asteroid.modules);
  app.use(asteroid.auth);
  app.use(asteroid.errors);
  
  app.listen(3000);
});



