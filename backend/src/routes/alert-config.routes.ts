import { Router } from 'express';
import { AlertConfigController } from '../controllers/alert-config.controller';
import { authenticate } from '../middleware/auth.middleware';

const router = Router();
const controller = new AlertConfigController();

// All routes require authentication
router.use(authenticate);

// Get alert configuration
router.get('/config', controller.getConfig.bind(controller));

// Update alert configuration
router.put('/config', controller.updateConfig.bind(controller));

// Test alert
router.post('/test', controller.testAlert.bind(controller));

export default router;
