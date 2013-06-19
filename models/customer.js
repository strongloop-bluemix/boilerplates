/**                                                 
 * Module Dependencies                              
 */                                                 
                                                    
var db = require("../data-sources/db");     
var config = require("./customer.json");              
                                                    
/**                                                 
 * customer Model                                     
 */                                                 
                                                    
var customer = module.exports = db.createModel(   
  "customer",                                         
  config.properties,                                
  config.options                                    
);                                                  