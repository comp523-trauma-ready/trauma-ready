# API endpoints 

## Hospital

#### GET /hospital
* Renders the HTML dashboard of all hospitals

#### POST /hospital
* Adds a new hospital to the database
* Requires:
    * User authentication -- must be an admin
    * Request body should be the new Hospital schema to add 
* Returns:
    * 201 and the newly added hospital If the request body is valid Hospital schema 
    * 500 and the request body if doc is invalid or some other database error occurs
* Notes: 
    * Upon request, makes a call to the Google Maps Geocoding API to automatically convert the address string into lat/long coordinates for storing in the database 

### GET /hospital/:hid
* Returns hospital JSON document with the given id
* Ids are positive integers incrementing from 0

### PUT /hospital/:hid
* Updates the Hospital schema with a given id based on the new schema passed in on 
request body
* Returns:
    * 400 if missing hid 
    * 500 if invalid request body
    * 201 + JSON of newly added hospital upon success 

### DELETE /hospital/:hid
* Deletes a hospital from the database by id
* Requires authentication 
* Returns deleted document on success, 500 on failure

### GET /hospital?name=""&rac=""
* Alternative way to search for hospitals by query string
* Returns array of hospitals that match the URL on success
* If nothing is provided after the "?", it just returns the base dashboard page


## RAC

### GET /rac
* Renders the HTML dashboard displaying all RAC information 

### GET /rac/:rid
* Returns a JSON document in the form of an RAC schema
* 400 if missing rid 
* 404 if invalid rid or other database error occurs

### POST /rac
* Saves a new RAC schema to the database based on request body 
* Returns 500 and request body if the save fails 
* Returns 201 and the newly added RAC if the save succeeds

### PUT /rac/:rid
* Update RAC to new schema on request body by id
* 400 if missing rid 
* 500 if database error + request body 
* 201 if success + newly updated JSON document

### DELETE /rac/:rid
* Delete RAC by rid
* 400 if missing rid 
* 500 if database error + request body 
* 201 if success + deleted JSON document

## Mobile 

### GET /mobile/hospitals
* Gets an array of all hospital JSON documents in alphabetical order by name
* Called upon mounting of Directory component
* If error occurs, returns error as json 

### GET /mobile/rac/:name
* Gets an array of all the activation codes for a single RAC based on its name
* Returns error as json if one occurs, otherwise returns array of activation ids
* Called upon mounting of a Hospital component 

### GET /mobile/hospitals/:latitude/:longitude
* Returns all the JSON for all nearby hospitals based on a *primitive calculation* 
* Given request latitude (rlat), request longitude (rlong), hospital latitude (hlat), hospital 
longitude hlong), returns all hospitals for which abs(hlat - rlat) < 100 && abs(hlong - rlong) < 100
* Not used in production

### GET /mobile/hospitals/full/:latitude/:longitude
* More sophisticated approach to finding nearby hospitals based on geodesics
* Calculation reference here: http://janmatuschek.de/LatitudeLongitudeBoundingCoordinates
* Used in production when the home screen mounts
* Returns hospital documents *with distance key appended* 
