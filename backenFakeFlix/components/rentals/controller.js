const Rental = require('./model');
const Movie = require('../movie/model');
const moment = require('moment');

module.exports.createRental = async (req, res) => {

    const arrayMovie = req.body.movies;
    const arrayPrice = await Promise.all(arrayMovie.map(async (value) => {
        try {
            const objectResult = await Movie.findById({ _id: value });
            return objectResult.price;
        } catch (e) {
            console.error(e);
            res.status(400).json({
                message: 'movie ' + value + ' not found'
            });
        }
    })
    )
    let result = arrayPrice.reduce((a, b) => a + b);
    try {
        console.log(typeof req.body.userId);
        const newRental = new Rental(req.body);
        newRental.totalPrice = result;
        newRental.userID= req.body.userId;
        newRental.rentalDate = moment();
        newRental.expirationDate = newRental.rentalDate.clone().add(8, "days");
            await newRental.save();
        res.status(200).json({ message: 'is good' });
    } catch (error) {
        res.status(404).json({
            message: "Rental not created"
        });
    }
};

module.exports.getRentals = async (req, res) => {
    let filter = {} ;
    
    if (req.token.role == 'user') {
        filter.userId = req.token._id        
    }

    try {
        const rentals = await Rental.find(filter);
        res.json(rentals);
        
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}; 

module.exports.getRentalId = async (req, res) => {

    try {
        
        const rental = await Rental.findById(req.params.id);

        if (!rental) {
            res.status(404).json({
                message: 'rental not found'
            });
        } else if (rental.userId !== req.token._id) {
            res.status(403).json({
                message: 'user not authorized'
            });
        } else {
            res.json(rental);
        }

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}; 