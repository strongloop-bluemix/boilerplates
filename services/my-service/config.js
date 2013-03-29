{
  "service": "./my-service.js",
  "env": {
    "dev": {
      "connection": {
        "host": "foo.bar.com",
        "port": 3333
      }
    },
    "stage": {
      "connection": {
        "host": "stage.bar.com",
        "port": 3333
      }
    },
    "prod": {
      "connection": {
        "host": "prod.bar.com",
        "port": 3333
      }
    }
  }
}