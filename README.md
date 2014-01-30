## StrongLoop Suite Sample Application

### i-Car Rentals Corp

i-Car is an (imaginary) car rental dealer with locations in major cities around
the world. They need to replace their existing desktop reservation system with
a new mobile app.

### What is the end user experience?

As a traveller with a limited budget, I need to be able to rent cars for an
upcoming trips, so I can use them for my business trips then return them to
avoid paying full price.

Currently I have to make reservations from my laptop. Since my job is
always on the trip, it isn't practical from me to always pull out my laptop to
rent cars. I need to be able to find the closest available cars wherever I am
and from my phone.

I should be able to open the i-Car Rentals App on my iPhone and see
a map of nearby rental locations. I should be able to push a "list" button that 
takes me to a list of available cars in the area. This area should only
include what is visible on the map that I can manipulate. I should be able to 
filter this list of cars by make, model, class, year and color.

Once I find the car I want to reserve I should be able to select it and enter
the quantity I want to reserve. If I am not logged in the app should prompt me 
to register. The app should tell me if the quantity is available and if so that 
my reservation has been made.

### Features

 - Authenticates and verifies the identity of military officials.
 - Securely exposes inventory data to mobile applications.
 - Allow users to find cars available **within a specific area**.
 - Allow users to reserve cars for rental.

### REST APIs

 - `/cars` exposes a queryable (filter, sort) collection of available cars
    over HTTP / JSON
 - `/cars/nearby?&lat=...&long=... or ?zip=...` returns a filtered set of
    available cars nearby the requesting user
 - `/cars/nearby?id=24&zip=94555` returns nearby cars of id 24.
 - `/cars/:id` returns a specific car from the inventory, with specific
    pricing and images
 - `/users/login` allows a customer to login
 - `/users/logout` allows a customer to logout

### Infrastructure

#### Customer Database

All customer information is available from the SalesForce api.

#### Inventory Database

All car inventory is already available in an **existing** Oracle X3-8 Exadata
Database Machine in an extremely secure location.

The Inventory DB schema looks like this:

##### **Customers**
 - id string
 - name string
 - username string
 - email string
 - password string
 - realm string
 - emailverified boolean
 - verificationtoken string
 - credentials string[]
 - challenges string[]
 - status string
 - created date
 - lastupdated date
 
##### **Reservations**
 - id string
 - product_id string
 - location_id string
 - customer_id string
 - qty number
 - status string
 - reserve_date date
 - pickup_date date
 - return_date date

##### **Inventory_Levels**
 - id string
 - product_id string
 - location_id string
 - available number
 - total number
 
##### **Car**
- id string
- vin string
- year number
- make string
- model string
- image string
- carClass string
- color string
 
##### **Location**
 - id string
 - street string
 - city string
 - zipcode string
 - name string
 - geo GeoPoint

##### **Inventory_View**

**View** to return qty of available products for the given city.

 - product (product name)
 - location (location name)
 - available (qty available)

#### Geo Lookup

Google's location API is used to return the users city from a given zip or lat/long.

### Configure and run the application

By default, the sample application uses the memory connector and listen on
http://0.0.0.0:3000.
 
> node app

Open browser and point it to http://127.0.0.1:3000.

You can configure other data sources by adding the following json into `.loopbackrc`
at the root of the module.

    {
        "demo": {
            "memory": {},
            "oracle": {
                "host": "your-oracle-server-ip-or-hostname",
                "port": 1521,
                "database": "XE",
                "username": "demo",
                "password": "password"
            },
            "mongodb": {
                "host": "your-mongodb-server-ip-or-hostname",
                "database": "demo",
                "username": "demo",
                "password": "password",
                "port": 27017
            }
        }
    }

The sample can be configured using the following environment variables:

- DB: The db type, use 'memory', 'mongodb' or 'oracle'
- IP: The http server listener ip address or hostname, default to 0.0.0.0 (any address)
- PORT: The http server listener port number, default to 3000

For example,

To run the application at port 3001 with MongoDB:

> DB=mongodb PORT=3001 node app

To run the application at port 3002 with Oracle:

> DB=oracle PORT=3002 node app

