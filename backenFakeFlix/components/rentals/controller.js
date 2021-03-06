const Rental = require('./model');
const Movie = require('../movie/model');
const User = require('../user/model')
const moment = require('moment');

module.exports.createRental = async (req, res) => {
    console.log(req.body)

    const arrayMovie = req.body.movieId;
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
        newRental.totalPrice = result
        console.log(newRental.totalPrice)
        newRental.userID = req.body.userId
        console.log(newRental.userID)
        newRental.rentalDate = moment()
        console.log(newRental.rentalDate)
        newRental.expirationDate = moment().add(8, "days"),
        console.log(newRental.expirationDate + '15')
        await newRental.save();
        res.status(200).json({ message: 'is good' })
    } catch (error) {
        console.log(error)
    }
};

module.exports.getRentals = async (req, res) => {
    console.log('llego aqui')

    // let filter = {};

    // // if (req.token.role == 'user') {
    // //     filter.userId = req.token._id        
    // // }

    try {
        const rentals = await Rental.find().populate({
            path: 'userId',
            select:
                'name email',
        })
            .populate({
                path: 'movieId',
                select:
                    'title',
            })
        res.json(rentals);

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
};

module.exports.getRentalId = async (req, res) => {
 
    try {

        const rental = await Rental.find({userId: req.params.id});

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

module.exports.modifyRental = async (req, res) => {

    try {
        const Rental = await Rental.findById(req.params.id);
        if (Rental) {
            const rentalUpdate = await Rental.findByIdAndUpdate(req.params.id, req.body, { new: true });
            res.status(200).json(
                rentalUpdate
                );
        } else {
            res.status(404).json({
                message: "movie not found"
            },);
        }
    } catch (error) {
        console.error(error);
        if (error.name == "ValidationError") {
            res.satus(400).json({
                menssage: error.message
            },);
        } else {
            res.status(500).json({
                message: error.message
            },);
        }
    }
};

module.exports.deleteRental = async (req, res) => {
    
    try {
        const rental = await Rental.findById(req.params.id);//id de la rental
        if (rental) {
            const rentalDelete = await Rental.findByIdAndDelete(req.params.id);
            
            res.status(200).json({
                message: 'rental deleted'
            });
        } else {
            res.status(404).json({
                message: "rental not found"
            },);
        }
    } catch (error) {
        res.status(500).json({
            message: error.message
        },);
    }
};