import { Request, Response } from 'express';
import { ServicesRepository } from '../repositories/services.repository';
import { CreateServiceRequest, UpdateServiceRequest, ServiceFilters, ApiResponse } from '../types';

const repository = new ServicesRepository();

export class ServicesController {
  async getAll(req: Request, res: Response): Promise<void> {
    try {
      const filters: ServiceFilters = {
        status: req.query.status as string,
        team_id: req.query.team_id as string,
        template: req.query.template as string,
        limit: req.query.limit ? parseInt(req.query.limit as string) : 50,
        offset: req.query.offset ? parseInt(req.query.offset as string) : 0,
      };

      const { services, total } = await repository.findAll(filters);

      const response: ApiResponse = {
        success: true,
        data: services,
        total,
      };

      res.json(response);
    } catch (error) {
      console.error('Error fetching services:', error);
      const response: ApiResponse = {
        success: false,
        error: 'Failed to fetch services',
      };
      res.status(500).json(response);
    }
  }

  async getById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const service = await repository.findById(id);

      if (!service) {
        const response: ApiResponse = {
          success: false,
          error: 'Service not found',
        };
        res.status(404).json(response);
        return;
      }

      const response: ApiResponse = {
        success: true,
        data: service,
      };

      res.json(response);
    } catch (error) {
      console.error('Error fetching service:', error);
      const response: ApiResponse = {
        success: false,
        error: 'Failed to fetch service',
      };
      res.status(500).json(response);
    }
  }

  async create(req: Request, res: Response): Promise<void> {
    try {
      const serviceData: CreateServiceRequest = req.body;

      // Validate required fields
      if (!serviceData.name || !serviceData.template || !serviceData.owner || !serviceData.team_id) {
        const response: ApiResponse = {
          success: false,
          error: 'Missing required fields: name, template, owner, team_id',
        };
        res.status(400).json(response);
        return;
      }

      const service = await repository.create(serviceData);

      const response: ApiResponse = {
        success: true,
        data: service,
        message: 'Service created successfully',
      };

      res.status(201).json(response);
    } catch (error) {
      console.error('Error creating service:', error);
      const response: ApiResponse = {
        success: false,
        error: 'Failed to create service',
      };
      res.status(500).json(response);
    }
  }

  async update(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const updates: UpdateServiceRequest = req.body;

      const service = await repository.update(id, updates);

      if (!service) {
        const response: ApiResponse = {
          success: false,
          error: 'Service not found',
        };
        res.status(404).json(response);
        return;
      }

      const response: ApiResponse = {
        success: true,
        data: service,
        message: 'Service updated successfully',
      };

      res.json(response);
    } catch (error) {
      console.error('Error updating service:', error);
      const response: ApiResponse = {
        success: false,
        error: 'Failed to update service',
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
          error: 'Service not found',
        };
        res.status(404).json(response);
        return;
      }

      const response: ApiResponse = {
        success: true,
        message: 'Service deleted successfully',
      };

      res.json(response);
    } catch (error) {
      console.error('Error deleting service:', error);
      const response: ApiResponse = {
        success: false,
        error: 'Failed to delete service',
      };
      res.status(500).json(response);
    }
  }
}
