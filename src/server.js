const express = require('express'),
    path = require('path'),
    bodyParser = require('body-parser'),
    mysql = require('mysql'),
    myConnection = require('express-myConnection'),
    logger = require('morgan'),

    app = express();

// config
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(myConnection(mysql, {
    host: 'localhost',
    user: 'root',
    password: '',
    port: 3306,
    database: 'test'
}) );

// middlewares
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.use('/',require('./routes'));

app.listen(app.get('port'), ()=> { console.log('Listennig to port: ' + app.get('port')); });