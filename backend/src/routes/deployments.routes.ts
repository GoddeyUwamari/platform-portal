import { Router } from 'express';
import { DeploymentsController } from '../controllers/deployments.controller';

const router = Router();
const controller = new DeploymentsController();

router.get('/', (req, res) => controller.getAll(req, res));
router.get('/:id', (req, res) => controller.getById(req, res));
router.post('/', (req, res) => controller.create(req, res));
router.delete('/:id', (req, res) => controller.delete(req, res));

export default router;
