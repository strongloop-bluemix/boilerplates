/**                                                 
 * Module Dependencies                              
 */                                                 
                                                    
var oracle = require("../data-sources/oracle");     
var config = require("./weapon.json");              
                                                    
/**                                                 
 * product Model                                     
 */                                                 
                                                    
var Weapon = module.exports = oracle.createModel(   
  "weapon",                                         
  config.properties,                                
  config.options                                    
);