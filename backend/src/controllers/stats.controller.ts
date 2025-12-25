import { Request, Response } from 'express';
import { ServicesRepository } from '../repositories/services.repository';
import { DeploymentsRepository } from '../repositories/deployments.repository';
import { InfrastructureRepository } from '../repositories/infrastructure.repository';
import { ApiResponse, PlatformStats } from '../types';

const servicesRepo = new ServicesRepository();
const deploymentsRepo = new DeploymentsRepository();
const infrastructureRepo = new InfrastructureRepository();

export class StatsController {
  async getDashboardStats(req: Request, res: Response): Promise<void> {
    try {
      // Fetch all stats in parallel
      const [
        servicesData,
        activeDeployments,
        totalCost,
        recentDeployments,
        activeServices,
      ] = await Promise.all([
        servicesRepo.findAll({ limit: 1000 }),
        deploymentsRepo.countByStatus('running'),
        infrastructureRepo.getTotalMonthlyCost(),
        deploymentsRepo.findRecentByLimit(5),
        servicesRepo.findAll({ status: 'active', limit: 1000 }),
      ]);

      // Calculate free tier remaining (AWS free tier is ~$300/year = ~$25/month)
      const freeTierMonthly = 25.00;
      const freeTierRemaining = Math.max(0, freeTierMonthly - totalCost);

      // Calculate service health
      const totalServices = servicesData.total;
      const healthyServices = activeServices.services.length;
      const unhealthyServices = totalServices - healthyServices;

      const stats: PlatformStats = {
        total_services: totalServices,
        active_deployments: activeDeployments,
        total_infrastructure_cost: totalCost,
        free_tier_remaining: freeTierRemaining,
        recent_deployments: recentDeployments,
        service_health: {
          healthy: healthyServices,
          unhealthy: unhealthyServices,
        },
      };

      const response: ApiResponse<PlatformStats> = {
        success: true,
        data: stats,
      };

      res.json(response);
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
      const response: ApiResponse = {
        success: false,
        error: 'Failed to fetch dashboard stats',
      };
      res.status(500).json(response);
    }
  }
}
