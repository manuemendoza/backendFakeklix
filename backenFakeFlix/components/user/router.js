const router = require ('express').Router();
const controller = require ('./controller.js');
const auth = require('../../auth');

router.get('/:id', auth.checkAdminOrOwn, controller.getUserById);
router.get('/',  controller.getUserByKey);
// router.get('/', auth.checkAdminOrOwn, controller.getUserCollection);// buscar todos los usario (SOLO ADMIN) 
router.post('/', controller.createUser);  //crear usuario
router.post('/login', controller.loginUser); //login usuario
router.put('/:id', auth.checkAdminOrOwn, controller.modifyUser); 
router.delete('/:id', auth.checkAdminOrOwn, controller.deleteUser);

module.exports = router;