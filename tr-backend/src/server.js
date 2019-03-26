require('./models/db');

const express = require('express');
const app = express();

const bodyparser = require('body-parser');

app.use(bodyparser.urlencoded({extended: true}));
app.use(bodyparser.json());

const employeeRouter = require('./routes/employee');
const hospitalRouter = require('./routes/hospital');

const path = require('path');
const exphbs = require('express-handlebars');

app.set('views', path.join(__dirname, '../views/'));
app.engine('hbs', exphbs({extname: 'hbs', 
  defaultLayout: 'mainLayout', 
  layoutsDir: path.join(__dirname, '../views/layouts/')
}));
app.set('view engine', 'hbs');

app.use('/employee', employeeRouter);
app.use('/hospital', hospitalRouter);
app.use(express.static('public'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.info(`Server has started on ${PORT}`));
