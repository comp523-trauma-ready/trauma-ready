# REST API Specification

* For testing during development: [cURL reference](https://gist.github.com/subfuzion/08c5d85437d5d4f00e58)
* For automated endpoint unit testing: [Mochajs](https://mochajs.org)
* For notes on API design: [AppLab slides](https://gitlab.com/unc-app-lab/backend-tutorial/blob/master/talk-slides.pdf)

## Operations on data that we need to support: 

  * getting recommended hospitals based on distance
  * getting recommended hospitals based on search query
  * getting a listing of all hospitals for a directory
  * getting the full profile of a particular hospital 
  * getting the full content for a particular activation card
  * getting all activation cards for a particular hospital
  * updating the full profile of a particular hospital
  * updating the full profile of a particular activation card
  * adding new hospitals 
  * adding new activation cards 

## Data models (JSON):  

```
hospitalModel = {
  "id"             : Number,
  "name"           : String,
  "rac"            : String,
  "traumaLevel"    : String,
  "services"       : [String],
  "address"        : String,
  "latitude"       : Number,
  "longitude"      : Number,
  "phoneDirectory" : [String],
  "email"          : String,
  "notes"          : String,
}
```

```
traumaModel = {
  "id"       : Number,
  "name"     : String,
  "criteria" : [String],
  "notes"    : String, 
}
```

```
racModel = {
  "id"    : Number, 
  "name"  : String, 
  "codes" : [String],
  "notes" : String,
}
```

```
// Web portal only 
employeeModel = {
  "first"  : String,
  "last"   : String,
  "email"  : String, 
  "mobile" : String, 
  "city"   : String,
}
```

## Endpoints

| ﻿Path             | Method | Params              | Status   | ResponseType | Response            | Mutating | Finished |
|------------------|--------|---------------------|----------|--------------|---------------------|----------|----------|
| /recommended/    | GET    | latitude, longitude | 200, 404 | json         | [hospitalPreview]   | no       | no       |
| /recommended/    | GET    | queryString         | 200, 404 | json         | [hospitalPreview]   | no       | no       |
| /hospitals/      | GET    | none                | 200,     | json         | [hospitalPreview]   | no       | no       |
| /hospitals/:id   | GET    | none                | 200, 404 | json         | hospitalModel       | no       | no       |
| /hospitals/:id   | POST   | hospitalModel       | 200, 404 | json         | success/failure     | yes      | no       |
| /hospitals/:id   | PUT    | {hospitalModel}     | 200, 404 | json         | hospitalModel       | yes      | no       |
| /activations     | GET    | none                | 200,     | json         | [activationPreview] | no       | no       |
| /activations/:id | GET    | none                | 200, 404 | json         | activationModel     | no       | no       |
| /activations/:id | POST   | activationModel     | 200, 404 | json         | success/failure     | yes      | no       |
| /activations/:id | PUT    | {activationModel}   | 200, 404 | json         | activationModel     | yes      | no       |
| /rac/            | GET    | none                | 200,     | json         | [racModel]          | no       | no       |
| /rac/:id         | GET    | none                | 200, 404 | json         | racModel            | no       | no       |

Notation:            
  * Values in the params column correpond to properties on a json object; "none" corresponds to the empty object {}           
  * Values  in the response column are defined by models or collections of models denoted above           
  * Values in method and status columns correspond to their HTTP definitions            
  * Mutating actions may only be done by users administrator privileges           
  * JSON models wrapped in brackets like {hospitalModel} denotes the ability to pass a subset of the entire object (ala setState({}) in React)

Questions:
  * How is the relationship between activations and hospitals being represented? Is this a sufficiently fast representation? 