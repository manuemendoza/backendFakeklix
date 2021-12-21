require('dotenv').config();
const express = require('express');

const routingRental = require('./components/rentals/router')
const routingMovie = require('./components/movie/router.js');
const routingUser = require('./components/user/router.js');
const connection = require('./connection.js');
require('dotenv').config();



connection();

const app = express();
<<<<<<< HEAD
app.use(function (req, res, next) {
=======

app.use(function(req, res, next) {
>>>>>>> 02fcf8062f15eb4b402d8dec3b0f0b2f0e6b1714
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
});

// app.use(function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
//     next();
// });

app.use(express.json());

app.use('/users', routingUser);
app.use('/rentals', routingRental)
app.use('/movies', routingMovie);


app.listen(process.env.PORT, () => console.log('Servidor levantado en', process.env.PORT));
