var asteroid = require("asteroid");

module.exports = asteroid.createDataSource({
    connector: require("asteroid-connector-rest"),
    debug: false,
    operations: [
        {
            template: {
                "method": "GET",
                "url": "http://maps.googleapis.com/maps/api/geocode/{format=json}",
                "headers": {
                    "accepts": "application/json",
                    "content-type": "application/json"
                },
                "query": {
                    "address": "{street},{city},{zipcode}",
                    "sensor": "{sensor=false}"
                },
                "responsePath": "$.results[0].geometry.location"
            },
            functions: {
               "geocode": ["street", "city", "zipcode"]
            }
        }
    ]});


