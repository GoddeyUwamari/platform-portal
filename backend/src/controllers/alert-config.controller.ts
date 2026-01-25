import { Request, Response } from 'express';
import { AlertNotificationService } from '../services/alert-notification.service';

// Store configurations in database (add table later)
const alertConfigs = new Map<string, any>();

export class AlertConfigController {
  // Get alert configuration
  async getConfig(req: Request, res: Response) {
    try {
      const organizationId = req.user?.organizationId;
      if (!organizationId) {
        return res.status(401).json({ success: false, error: 'Unauthorized' });
      }
      const config = alertConfigs.get(organizationId) || {
        email: { enabled: false, recipients: [], smtpHost: '', smtpPort: 587, smtpUser: '', smtpPass: '' },
        slack: { enabled: false, webhookUrl: '', channel: '' },
        webhook: { enabled: false, url: '' },
      };

      res.json({ success: true, data: config });
    } catch (error: any) {
      res.status(500).json({ success: false, error: error.message });
    }
  }

  // Update alert configuration
  async updateConfig(req: Request, res: Response) {
    try {
      const organizationId = req.user?.organizationId;
      if (!organizationId) {
        return res.status(401).json({ success: false, error: 'Unauthorized' });
      }
      const config = req.body;

      // TODO: Validate config
      // TODO: Store in database

      alertConfigs.set(organizationId, config);

      res.json({ success: true, message: 'Alert configuration updated' });
    } catch (error: any) {
      res.status(500).json({ success: false, error: error.message });
    }
  }

  // Test alert notification
  async testAlert(req: Request, res: Response) {
    try {
      const organizationId = req.user?.organizationId;
      if (!organizationId) {
        return res.status(401).json({ success: false, error: 'Unauthorized' });
      }
      const { type } = req.body; // 'email', 'slack', or 'webhook'

      const config = alertConfigs.get(organizationId);
      if (!config) {
        return res.status(400).json({ success: false, error: 'No configuration found' });
      }

      const alertService = new AlertNotificationService(config);

      await alertService.sendAlert({
        severity: 'info',
        title: 'Test Alert',
        message: 'This is a test alert from DevControl. If you received this, your notifications are working correctly!',
        source: 'DevControl Test',
        timestamp: new Date(),
        metadata: { test: true },
      });

      res.json({ success: true, message: 'Test alert sent successfully' });
    } catch (error: any) {
      res.status(500).json({ success: false, error: error.message });
    }
  }
}
