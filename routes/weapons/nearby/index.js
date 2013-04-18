// get this resource
var nearby = require('resources')(__dirname);

// require a service
var geo = require('services')('geo');

// add a middleware
nearby.use(function (req, res, next) {
  // convert the provided zip or location into a city
  var zip = req.query.zip
    , hasLocation = (req.query.lat && req.query.long)
    , loc = hasLocation && {lat: req.query.at, long: req.query.long};
  
  if(hasLocation) {
    geo.lookupCityByLocation(loc, done);
  } else if(zip) {
    geo.lookupCityByZip(zip, done);
  } else {
    throw new Error('a zip or lat/long is required');
  }

  function done(err, city) {
    if(err) throw err;
  
    req.query.city = city;
  
    next();
  }
});

// do some async post processing / transform
nearby.before('done', function (data, done) {
  data.forEach(function (d) {
    d.id = d.product_id;
    delete d.product_id;
  });
  
  // simulate async
  setTimeout(done, 1);
});