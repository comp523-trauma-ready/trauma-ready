const mongoose = require('mongoose');
const path = require('path');
const fs = require('fs');

// Read credentials from localfile
const credsFile = path.resolve(__dirname, 'credentials.txt');
const contents = fs.readFileSync(credsFile).toString().split(";");

let sp = contents[0].split(" = ")[1]; 
let dp = contents[1].split(" = ")[1];
let up = contents[2].split(" = ")[1];
let pp = contents[3].split(" = ")[1];

let server = sp.substring(1, sp.length-1);
let database = dp.substring(1, dp.length-1);
let user = up.substring(1, up.length-1);
let password = pp.substring(1, pp.length-1);

mongoose.connect(`mongodb://${user}:${password}@${server}/${database}`, { useNewUrlParser: true }, (err) => {
  if (!err) {
    console.log('MongoDB Connection Successful');
  } else {
    console.log(`Error in DB connection : ${err}`);
  }
});

require('./employee.model');
require('./hospital.model');
