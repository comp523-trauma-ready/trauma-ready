### Testing 

To run our automated unit tests, 

`` cd ~/trauma-ready/tests ``
`` npm install``
`` npm run test ``

This last command will run all of our testing suites automatically. Our testing code depends on 
Axios for sending HTTP requests and Jest for assertions. We effectively test that our API endpoints
return the correct data structures and correct response codes for all requests. 