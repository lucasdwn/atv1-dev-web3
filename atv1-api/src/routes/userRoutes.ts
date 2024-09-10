import express from 'express';
import userController from '../controllers/userController';
const router = express.Router();

router.post('/', userController.createUser);
router.get('/', userController.getUsers);
router.put('/:userId', userController.update);
router.delete('/:userId', userController.delete);

export default router;
