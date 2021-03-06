const router = require ('express').Router();
const controller = require ('./controller');
const auth = require('../../auth');

router.post('/', auth.checkUser, controller.createRental);
router.get('/:id', auth.checkUser, controller.getRentalId);
router.get('/',  controller.getRentals);
router.get('/:id',  controller.deleteRentalId);

module.exports = router;