{
  "service": "OracleDB",
  "env": {
    "dev": {
      "connection": {
        "host": "foo.bar.com",
        "port": 3333,
        "database": "inventory",
        "username": "joe",
        "password": "532579822000116532579822000116"
      }
    },
    "stage": {
      "connection": {
        "host": "stage.bar.com",
        "port": 3333,
        "database": "inventory",
        "username": "joe",
        "password": "baz"
      }
    },
    "prod": {
      "connection": {
        "host": "prod.bar.com",
        "port": 3333,
        "database": "inventory",
        "username": "joe",
        "password": "foo"
      }
    }
  }
}