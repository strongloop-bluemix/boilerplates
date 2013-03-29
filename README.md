## Asteroid Sample Application

### BlackPool Surplus Rentals Corp

BlackPool is an (imaginary) military equipment rental dealer with outlets in major cities accross the globe. They need to replace their existing desktop reservation system with a new mobile app.

### What is the end user experience?

As a small country army general with a limited budget, I need to be able to rent weapons for an upcoming battle, so I can use them to defeat my enemy then return them to avoid paying full price.

Currently I have to make reservations from my laptop. Since my battalion is always on the move, it isn't practical from me to always pull out my laptop to rent some more ammunition. I need to be able to find the closest available weapons an ammo wherever I am and from my phone. 

### Features

 - Authenticates and verifies the identity of military officials.
 - Securely exposes inventory data to mobile applications.
 - Allow users to find weapons and ammo available for rental nearby.

### APIs

 - `/weapons` exposes a queryable (filter, sort) collection of available weapons over HTTP / JSON
 - `/weapons/nearby?&lat=...&long=... or ?zip=...` returns a filtered set of available weapons nearby the requesting user
 - `/weapons/nearby?id=24&zip=94555` returns nearby weapons of id 24.
 - `/weapons/:id` returns a specific weapon from the inventory, with specific pricing and images

### Infrastructure

#### Inventory Database

All weapon inventory is stored in an existing Oracle X3-8 Exadata Database Machine in an extremely secure location.

The Inventory DB schema looks like this:

##### **Customers**
 - customer_id
 - name
 - country
 - military_agency
 
##### **Reservations**
 - status
 - customer_id
 - parent_reservation
 - product_id
 - product_qty
 - location_id
 - return_date
 
##### **Inventory_Levels**
 - product_id
 - inventory_date
 - location_id
 - qty_in_stock
 
##### **Products**
 - product_id
 - product_name
 - qty_in_stock
 
##### **Location**
 - location_id
 - address
 - name

##### **findAvailableProductsByCity**

Stored procedure to return qty of available products for the given city.

Arguments: `City`, optional `Product ID`.

#### Geo Lookup

Google's location API is used to return the users city from a given zip or lat/long.

