import Router from 'express';
import userController from '../controllers/userController.js';
import authHandler from '../middleware/authHandler.js'
import userHandler from '../middleware/userHandler.js';
import validarPassword from '../middleware/validarPassword.js';
import newPassHandler from '../middleware/newPassHandler.js'


const router = Router();

router.use((req, res, next) => {
    console.log('---> userRouter.js');
    next();
});

router.use(userHandler.validateUserEmail);
router.use(validarPassword.validateUserPassword);

const addTimestamp = (req, res, next) => {
    console.log('---> userRouter:addTimestamp');
    req.body.timestamp = new Date();
    next();
}

router.route('/grants')
    .post(userController.addGrants)
    .put(userController.changeGrants)
    .delete(userController.deleteGrants);

router.route('/register')
    .post(authHandler.encryptPassword)
    .post(addTimestamp)
    .post(userController.register);

router.route('/login')
    .post(userController.login);

router.route('/newpass')
    .put(newPassHandler.encryptPassword)
    .put(userController.newPass);

router.route('/user')
    .put(userController.activateUser)
    .delete(userController.deleteUser);

router.route('/:username')
    .get(userController.getUser);



export default router;