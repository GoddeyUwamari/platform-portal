import { Router } from 'express';
import { StatsController } from '../controllers/stats.controller';

const router = Router();
const controller = new StatsController();

router.get('/stats/dashboard', (req, res) => controller.getDashboardStats(req, res));

export default router;
