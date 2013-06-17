/**                                                 
 * Module Dependencies                              
 */                                                 
                                                    
var oracle = require("../data-sources/oracle");     
var config = require("./customer.json");              
                                                    
/**                                                 
 * customer Model                                     
 */                                                 
                                                    
var customer = module.exports = oracle.createModel(   
  "customer",                                         
  config.properties,                                
  config.options                                    
);                                                  