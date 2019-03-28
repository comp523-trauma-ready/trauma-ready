# REST API Specification

* For testing during development: [cURL reference](https://gist.github.com/subfuzion/08c5d85437d5d4f00e58)
* For automated endpoint unit testing: [Mochajs](https://mochajs.org)
* For notes on API design: [AppLab slides](https://gitlab.com/unc-app-lab/backend-tutorial/blob/master/talk-slides.pdf)

Operations on data that we need to support: 

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

Data models (JSON):  

```hospitalPreview = {} ```

```hospitalProfile = {}```

```activationPreview = {}```

```activationProfile = {}```

| Path                           | Method | Params                                  | Status   | Response            |
|--------------------------------|--------|-----------------------------------------|----------|---------------------|
| /recommended/                  | GET    | latitude, longitude                     | 200, 404 | [hospitalPreview]   |
| /recommended/                  | GET    | query                                   | 200, 404 | [hospitalPreview]   |
| /hospitals/                    | GET    | -                                       | 200      | [hospitalPreview]   |
| /hospitals/:id                 | GET    | -                                       | 200, 404 | hospitalProfile     |
| /hospitals/:id                 | POST   | hospitalProfile                         | 200, 404 | success/failure     |
| /hospitals/:id                 | PUT    | hospitalProfile | {hospitalProfile}     | 200, 404 | obj: changed params |
| /hospitals/:id/activations     | GET    | -                                       | 200, 404 | [activationPreview] |
| /hospitals/:id/activations/:id | GET    | -                                       | 200, 404 | activationProfile   |
| /hospitals/:id/activations/:id | POST   | activationProfile                       | 200, 404 | success/failure     |
| /hospitals/:id/activations/:id | PUT    | activationProfile | {activationProfile} | 200, 404 | obj: changed params |