import { Router, Request, Response } from 'express'
import awsCostService from '../services/aws-cost.service'

const router = Router()

/**
 * GET /api/aws/costs/monthly
 * Fetch current month costs from AWS Cost Explorer
 */
router.get('/costs/monthly', async (req: Request, res: Response) => {
  try {
    const costs = await awsCostService.fetchMonthlyCosts()
    res.json(costs)
  } catch (error) {
    console.error('Error fetching monthly costs:', error)
    res.status(500).json({
      error: 'Failed to fetch monthly costs',
      message: error instanceof Error ? error.message : 'Unknown error',
    })
  }
})

/**
 * GET /api/aws/resources
 * Fetch all AWS resources (EC2, RDS, S3)
 */
router.get('/resources', async (req: Request, res: Response) => {
  try {
    const resources = await awsCostService.fetchAllResources()
    res.json({
      total: resources.length,
      resources,
    })
  } catch (error) {
    console.error('Error fetching AWS resources:', error)
    res.status(500).json({
      error: 'Failed to fetch AWS resources',
      message: error instanceof Error ? error.message : 'Unknown error',
    })
  }
})

/**
 * POST /api/aws/sync
 * Sync AWS resources to database
 */
router.post('/sync', async (req: Request, res: Response) => {
  try {
    await awsCostService.syncResourcesToDatabase()
    res.json({
      success: true,
      message: 'AWS resources synced to database successfully',
    })
  } catch (error) {
    console.error('Error syncing AWS resources:', error)
    res.status(500).json({
      error: 'Failed to sync AWS resources',
      message: error instanceof Error ? error.message : 'Unknown error',
    })
  }
})

export default router
