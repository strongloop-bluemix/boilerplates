## Bluemix LoopBack Sample Starter application
IBM® Bluemix™ provides a StrongLoop LoopBack Starter app. This boilerplate gets you started with a sample Node.js app that uses the StrongLoop Process Manager to start and supervise a LoopBack app. You can add your own APIs and push the changes back to the Bluemix environment. 

1. [Install the cf command-line tool](https://www.ng.bluemix.net/docs/cli/downloads.html).
2. Using cf, connect and login to Bluemix with your credentials.
  
  ```
    cf api https://api.ng.bluemix.net
    cf login
  ```
3. `cd` to the application directory and push your application to Bluemix
  
  ```
    cf push unique_app_name -p .
  ```

## Creating APIs

Let's get started with composing APIs. You'll need to create a StrongLoop account to access Arc.  Navigate to http://strongloop.com/ and create a free trial account.

1. First, you'll need to have the Node.js runtime (`node`) and `npm` installed on your local machine.
2. To start composing APIs, you need to install the set of StrongLoop suite of utilities.
  
  ```
    npm install -g strongloop
  ```
3. Start Arc from within your application directory
  
  ```
    slc arc
  ```
4. Click on the "Composer" feature within Arc to start creating datasources and models for your LoopBack application.
5. Use the `cf push app_name -p .` command to push changes to Bluemix.

## Managing your app

After your app and APIs are created and you have installed StrongLoop, you can manage your app while it runs on Bluemix.

Ensure that you have installed and registered for StrongLoop. Confirm that you have pushed your application using the `cf push` command.

Follow these steps to manage your app with StrongLoop Arc.

1. Map a new route to your app by using one of the following methods:
  
  ```
    cf map-route <your_app_name> mybluemix.net -n <your_app_name>-pm
  ```
or
> Go to the Bluemix Dashboard, click the app tile to go the app overview page, and click the Edit routes button to the right of the Routes field.
>
> Add the route: `<your_app_name>-pm.mybluemix.net`

2. Run StrongLoop Arc to add your app to the process manager.
  
  ```
    slc arc
  ```
3. When prompted, log in to StrongLoop.
4. In the Arc module selector, navigate to Process Manager.
5. Add your app's route, `<your_app_name>-pm.mybluemix.net`, with port 80 to the process manager.
6. Click Activate and use the process manager's tracing, metrics, and profiler to get information about your app as it runs on Bluemix. See Operating Node applications in the StrongLoop documentation for more information.
