import { Router } from 'express';
import { pool } from '../config/database';
import { AWSResourcesController } from '../controllers/awsResources.controller';
import { authenticate } from '../middleware/auth.middleware';
import { requireAdmin } from '../middleware/rbac.middleware';

const router = Router();
const controller = new AWSResourcesController(pool);

/**
 * GET /api/aws-resources
 * List all AWS resources with optional filters
 */
router.get('/', authenticate, (req, res, next) => controller.getAll(req, res, next));

/**
 * GET /api/aws-resources/stats
 * Get resource statistics and summary
 */
router.get('/stats', authenticate, (req, res, next) => controller.getStats(req, res, next));

/**
 * GET /api/aws-resources/compliance
 * Get all compliance issues
 */
router.get('/compliance', authenticate, (req, res, next) => controller.getComplianceIssues(req, res, next));

/**
 * GET /api/aws-resources/orphaned
 * Get orphaned resources
 */
router.get('/orphaned', authenticate, (req, res, next) => controller.getOrphaned(req, res, next));

/**
 * GET /api/aws-resources/discovery/jobs
 * Get discovery job history
 */
router.get('/discovery/jobs', authenticate, (req, res, next) => controller.getDiscoveryJobs(req, res, next));

/**
 * POST /api/aws-resources/discover
 * Trigger resource discovery scan (Admin only)
 */
router.post('/discover', authenticate, requireAdmin, (req, res, next) => controller.discover(req, res, next));

/**
 * GET /api/aws-resources/:id
 * Get single resource by ID
 */
router.get('/:id', authenticate, (req, res, next) => controller.getById(req, res, next));

/**
 * DELETE /api/aws-resources/:id
 * Delete resource tracking (Admin only)
 * Note: This only removes tracking, not the actual AWS resource
 */
router.delete('/:id', authenticate, requireAdmin, (req, res, next) => controller.delete(req, res, next));

export default router;
