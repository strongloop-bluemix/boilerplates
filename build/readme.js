/**
 * The utility sets up the default README.md based on the PAAS_PROVIDER environment variable
 */
var fs = require('fs');
var path = require('path');

if (process.env.PAAS_PROVIDER) {
  var readme = path.join(__dirname, '../README.md'); // README.md
  var slReadme = path.join(__dirname, '../README.strongloop.md'); // README.strongloop.md
  var paasReadme = path.join(__dirname, '../README.' + process.env.PAAS_PROVIDER + '.md'); // README.<paas_provider>.md, for example README.cloud9.md
  // If the provider specific README exists
  if (fs.existsSync(paasReadme)) {
    // Rename README.md to be README.strongloop.md
    if (fs.existsSync(readme)) {
      fs.renameSync(readme, slReadme);
      console.log(readme, '-->', slReadme);
    }
    // Rename README.<paas_provider>.md to be README.md
    fs.renameSync(paasReadme, readme);
    console.log(paasReadme, '-->', readme);
  }
}