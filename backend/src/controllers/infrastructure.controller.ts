import { Request, Response } from 'express';
import { InfrastructureRepository } from '../repositories/infrastructure.repository';
import { CreateInfrastructureRequest, InfrastructureFilters, ApiResponse } from '../types';

const repository = new InfrastructureRepository();

export class InfrastructureController {
  async getAll(req: Request, res: Response): Promise<void> {
    try {
      const filters: InfrastructureFilters = {
        service_id: req.query.service_id as string,
        resource_type: req.query.resource_type as string,
        status: req.query.status as string,
        limit: req.query.limit ? parseInt(req.query.limit as string) : undefined,
        offset: req.query.offset ? parseInt(req.query.offset as string) : undefined,
      };

      const resources = await repository.findAll(filters);

      const response: ApiResponse = {
        success: true,
        data: resources,
      };

      res.json(response);
    } catch (error) {
      console.error('Error fetching infrastructure resources:', error);
      const response: ApiResponse = {
        success: false,
        error: 'Failed to fetch infrastructure resources',
      };
      res.status(500).json(response);
    }
  }

  async getById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const resource = await repository.findById(id);

      if (!resource) {
        const response: ApiResponse = {
          success: false,
          error: 'Infrastructure resource not found',
        };
        res.status(404).json(response);
        return;
      }

      const response: ApiResponse = {
        success: true,
        data: resource,
      };

      res.json(response);
    } catch (error) {
      console.error('Error fetching infrastructure resource:', error);
      const response: ApiResponse = {
        success: false,
        error: 'Failed to fetch infrastructure resource',
      };
      res.status(500).json(response);
    }
  }

  async create(req: Request, res: Response): Promise<void> {
    try {
      const resourceData: CreateInfrastructureRequest = req.body;

      // Validate required fields
      if (!resourceData.service_id || !resourceData.resource_type ||
          !resourceData.aws_id || !resourceData.aws_region ||
          !resourceData.status || resourceData.cost_per_month === undefined) {
        const response: ApiResponse = {
          success: false,
          error: 'Missing required fields: service_id, resource_type, aws_id, aws_region, status, cost_per_month',
        };
        res.status(400).json(response);
        return;
      }

      const resource = await repository.create(resourceData);

      const response: ApiResponse = {
        success: true,
        data: resource,
        message: 'Infrastructure resource created successfully',
      };

      res.status(201).json(response);
    } catch (error) {
      console.error('Error creating infrastructure resource:', error);
      const response: ApiResponse = {
        success: false,
        error: 'Failed to create infrastructure resource',
      };
      res.status(500).json(response);
    }
  }

  async delete(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const deleted = await repository.delete(id);

      if (!deleted) {
        const response: ApiResponse = {
          success: false,
          error: 'Infrastructure resource not found',
        };
        res.status(404).json(response);
        return;
      }

      const response: ApiResponse = {
        success: true,
        message: 'Infrastructure resource deleted successfully',
      };

      res.json(response);
    } catch (error) {
      console.error('Error deleting infrastructure resource:', error);
      const response: ApiResponse = {
        success: false,
        error: 'Failed to delete infrastructure resource',
      };
      res.status(500).json(response);
    }
  }

  async getCosts(req: Request, res: Response): Promise<void> {
    try {
      const costBreakdown = await repository.getCostBreakdown();

      const response: ApiResponse = {
        success: true,
        data: costBreakdown,
      };

      res.json(response);
    } catch (error) {
      console.error('Error fetching cost breakdown:', error);
      const response: ApiResponse = {
        success: false,
        error: 'Failed to fetch cost breakdown',
      };
      res.status(500).json(response);
    }
  }
}
