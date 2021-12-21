const router = require ('express').Router();
const controller = require ('./controller');
const auth = require('../../auth');


router.post('/delete/:id', auth.checkUser, controller.deleteRental);
router.post('/', auth.checkUser, controller.createRental);
router.get('/:id', auth.checkUser, controller.getRentalId);
router.get('/',  controller.getRentals);
router.put('/',  controller.modifyRental);

module.exports = router