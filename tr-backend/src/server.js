const bodyparser = require('body-parser');
const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');

const app = express();

// Bootup database connection
require('./models/db');

// Passport config
require('./config/passport')(passport);


const indexRouter = require('./routes/index');
const userRouter = require('./routes/user');
const hospitalRouter = require('./routes/hospital');
const racRouter = require('./routes/rac');
const traumaRouter = require('./routes/trauma');
const activationsRouter = require('./routes/activations');


const mobileRouter = require('./routes/mobile');

// Allow express to recieve json from request bodies 
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: true}));

// Express Session
app.use(session({
        secret: 'secret',
        resave: true,
        saveUninitialized: true
    }));

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Connect flash
app.use(flash());

// Global Vars
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
});

// Page generation config
app.set('views', path.join(__dirname, '../views/'));
app.engine('hbs', exphbs({
    extname: 'hbs', 
    defaultLayout: 'mainLayout', 
    layoutsDir: path.join(__dirname, '../views/layouts/'),
    partialsDir: path.join(__dirname, '../views/partials'),
}));
app.set('view engine', 'hbs');

app.use('/', indexRouter);
app.use('/user', userRouter);
app.use('/hospital', hospitalRouter);
app.use('/rac', racRouter);
app.use('/trauma', traumaRouter);
app.use('/activations', activationsRouter);

app.use('/mobile', mobileRouter);

//app.use('/demo', demoRouter);

app.use(express.static('public'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.info(`Application running on ${PORT}`));
