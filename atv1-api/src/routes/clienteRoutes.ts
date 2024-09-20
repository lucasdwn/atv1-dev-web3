import express from 'express';
import clienteController from '../controllers/clienteController';
const router = express.Router();

router.post('/', clienteController.createCliente);
router.get('/', clienteController.getClientes);
router.put('/:clienteId', clienteController.update);
router.delete('/:clienteId', clienteController.delete);

export default router;
