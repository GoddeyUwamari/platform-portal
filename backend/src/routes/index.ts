import { Router } from 'express';
import servicesRoutes from './services.routes';
import deploymentsRoutes from './deployments.routes';
import infrastructureRoutes from './infrastructure.routes';
import teamsRoutes from './teams.routes';
import platformRoutes from './platform.routes';

const router = Router();

// API routes
router.use('/services', servicesRoutes);
router.use('/deployments', deploymentsRoutes);
router.use('/infrastructure', infrastructureRoutes);
router.use('/teams', teamsRoutes);
router.use('/platform', platformRoutes);

// API root
router.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Platform Portal API',
    version: '1.0.0',
    endpoints: {
      services: '/api/services',
      deployments: '/api/deployments',
      infrastructure: '/api/infrastructure',
      teams: '/api/teams',
      platform: '/api/platform',
    },
  });
});

export default router;
