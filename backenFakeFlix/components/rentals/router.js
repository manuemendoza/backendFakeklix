const router = require ('express').Router();
const controller = require ('./controller');
const auth = require('../../auth');

<<<<<<< HEAD

router.post('/delete/:id', auth.checkUser, controller.deleteRental);
router.post('/', auth.checkUser, controller.createRental);
router.get('/:id', auth.checkUser, controller.getRentalId);
router.get('/',  controller.getRentals);
router.put('/',  controller.modifyRental);
=======
router.post('/', auth.checkUser, controller.createRental);
router.get('/:id', auth.checkUser, controller.getRentalId);
router.get('/',  controller.getRentals);
router.get('/:id',  controller.deleteRentalId);
>>>>>>> 02fcf8062f15eb4b402d8dec3b0f0b2f0e6b1714

module.exports = router