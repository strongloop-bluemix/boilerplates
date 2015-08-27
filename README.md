## Bluemix LoopBack Sample
This is a sample LoopBack Node.js application which will use a modified [Node.js buildpack](https://github.com/svennam92/nodejs-buildpack) to run on Bluemix.  It starts strong-pm (StrongLoop process manager) in Bluemix to start and supervise your application. You can then use StrongLoop Arc to remotely manage your Bluemix application.

### Deploy to Bluemix

[![Deploy to Bluemix](https://bluemix.net/deploy/button.png)](https://bluemix.net/deploy?repository=https://github.com/programsam/loopback-example-app)

When you click this button, Bluemix will clone this repository into an IBM DevOps Services project, set up the deployment pipeline, and push your application to Bluemix.  Your application will get deployed with two routes.
```
<app_name>-arc.mybluemix.net	 # To access Arc for managing your application
<app_name>.mybluemix.net         # To access your sample application
<app_name>-pm.mybluemix.net      # To access Strong PM
```

##### Connecting from Arc

Once application is deployed, launch Arc locally:
   In a CLI, globally install the strongloop client and then launch Arc. Node (and npm) is a prerequisite.
   ```
   npm install -g strongloop
   slc arc
   ```
Then, add your PM URL with port 80 into the process manager.  You can then use Arc to manage your remotely running application.
