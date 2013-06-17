/**                                                 
 * Module Dependencies                              
 */                                                 
                                                    
var oracle = require("../data-sources/oracle");     
var config = require("./inventory.json");              
                                                    
/**                                                 
 * inventory Model                                     
 */                                                 
                                                    
var inventory = module.exports = oracle.createModel(   
  "inventory",                                         
  config.properties,                                
  config.options                                    
);                                                  