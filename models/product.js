/**                                                 
 * Module Dependencies                              
 */                                                 
                                                    
var oracle = require("../data-sources/oracle");     
var config = require("./product.json");              
                                                    
/**                                                 
 * product Model                                     
 */                                                 
                                                    
var product = module.exports = oracle.createModel(   
  "product",                                         
  config.properties,                                
  config.options                                    
);                                                  