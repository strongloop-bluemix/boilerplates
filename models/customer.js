/**                                                 
 * Module Dependencies                              
 */                                                 
                                                    
var db = require("../data-sources/db");     
var config = require("./customer.json");              
var asteroid = require('asteroid');                                
                                                    
/**                                                 
 * customer Model                                     
 */                                                 
                                                    
var customer = module.exports = asteroid.User.extend(
  'customer',
  config.properties,
  config.options
);

// attach to the db
customer.attachTo(db);
customer.session.attachTo(db);


// TODO - this should be available as `hideRemotely: true`
customer.afterRemote('**', function (ctx, inst, next) {
  if(Array.isArray(inst)) {
    inst.forEach(removePassword);
  } else if(inst) {
    removePassword(inst);
  }
  
  next();
});

function removePassword(inst) {
  if(inst && inst.__data && inst.__data.password) {
    inst.__data.password = undefined; 
  }
}