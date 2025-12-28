import cron from 'node-cron';
import { Pool } from 'pg';
import { AlertHistoryService } from '../services/alert-history.service';

export class AlertSyncJob {
  private service: AlertHistoryService;
  private task: cron.ScheduledTask | null = null;

  constructor(pool: Pool, prometheusUrl?: string) {
    this.service = new AlertHistoryService(pool, prometheusUrl);
  }

  /**
   * Start the alert sync job
   * Runs every minute to sync alerts from Prometheus
   */
  start(): void {
    if (this.task) {
      console.log('[Alert Sync Job] Already running');
      return;
    }

    // Run every minute
    this.task = cron.schedule('* * * * *', async () => {
      console.log('[Alert Sync Job] Running alert sync...');
      try {
        await this.service.syncAlertsFromPrometheus();
        console.log('[Alert Sync Job] Sync completed successfully');
      } catch (error: any) {
        console.error('[Alert Sync Job] Error during sync:', error.message);
      }
    });

    console.log('[Alert Sync Job] Started - syncing alerts every 1 minute');

    // Run immediately on start
    this.service.syncAlertsFromPrometheus()
      .then(() => console.log('[Alert Sync Job] Initial sync completed'))
      .catch((error: any) => console.error('[Alert Sync Job] Initial sync failed:', error.message));
  }

  /**
   * Stop the alert sync job
   */
  stop(): void {
    if (this.task) {
      this.task.stop();
      this.task = null;
      console.log('[Alert Sync Job] Stopped');
    }
  }

  /**
   * Check if the job is running
   */
  isRunning(): boolean {
    return this.task !== null;
  }
}
