/**                                                 
 * Module Dependencies                              
 */                                                 
                                                    
var oracle = require("../data-sources/oracle");     
var config = require("./location.json");              
                                                    
/**                                                 
 * location Model                                     
 */                                                 
                                                    
var location = module.exports = oracle.createModel(   
  "location",                                         
  config.properties,                                
  config.options                                    
);                                                  