const bodyparser = require('body-parser');
const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');

const app = express();

// Bootup database connection
require('./models/db');

const employeeRouter = require('./routes/employee');
const hospitalRouter = require('./routes/hospital');
const racRouter = require('./routes/rac');
const traumaRouter = require('./routes/trauma');
const activationsRouter = require('./routes/activations');


// Allow express to recieve json from request bodies 
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: true}));

// Page generation config
app.set('views', path.join(__dirname, '../views/'));
app.engine('hbs', exphbs({extname: 'hbs', 
  defaultLayout: 'mainLayout', 
  layoutsDir: path.join(__dirname, '../views/layouts/')
}));
app.set('view engine', 'hbs');

app.use('/employee', employeeRouter);
app.use('/hospital', hospitalRouter);
app.use('/rac', racRouter);
app.use('/trauma', traumaRouter);
app.use('/activations', activationsRouter);

app.use(express.static('public'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.info(`Application running on ${PORT}`));
