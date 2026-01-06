import cron from 'node-cron';
import { Pool } from 'pg';
import { AWSResourceDiscoveryService } from '../services/awsResourceDiscovery';

/**
 * Resource Discovery Background Job
 * Runs every 6 hours to discover AWS resources across all active organizations
 */
export class ResourceDiscoveryJob {
  private service: AWSResourceDiscoveryService;
 private task: ReturnType<typeof cron.schedule> | null = null;

  constructor(private pool: Pool) {
    this.service = new AWSResourceDiscoveryService(pool);
  }

  /**
   * Start the resource discovery job
   * Runs every 6 hours (at minute 0 of hours 0, 6, 12, 18)
   */
  start(): void {
    if (this.task) {
      console.log('[Resource Discovery Job] Already running');
      return;
    }

    // Run every 6 hours: '0 */6 * * *' (at minute 0 of every 6th hour)
    // For testing, you can use '*/5 * * * *' (every 5 minutes)
    this.task = cron.schedule('0 */6 * * *', async () => {
      console.log('[Resource Discovery Job] Starting scheduled discovery scan...');
      try {
        await this.runDiscoveryForAllOrganizations();
        console.log('[Resource Discovery Job] Scan completed successfully');
      } catch (error: any) {
        console.error('[Resource Discovery Job] Error during scan:', error.message);
      }
    });

    console.log('[Resource Discovery Job] Started - scanning resources every 6 hours');

    // Optionally run immediately on start (commented out to avoid immediate scan)
    // this.runDiscoveryForAllOrganizations()
    //   .then(() => console.log('[Resource Discovery Job] Initial scan completed'))
    //   .catch((error: any) => console.error('[Resource Discovery Job] Initial scan failed:', error.message));
  }

  /**
   * Run discovery for all active organizations
   */
  private async runDiscoveryForAllOrganizations(): Promise<void> {
    const client = await this.pool.connect();
    try {
      // Get all active organizations
      const result = await client.query(
        `SELECT id, name FROM organizations WHERE is_active = true`
      );

      const organizations = result.rows;
      console.log(`[Resource Discovery Job] Found ${organizations.length} active organizations`);

      // Run discovery for each organization sequentially
      for (const org of organizations) {
        try {
          console.log(`[Resource Discovery Job] Scanning organization: ${org.name} (${org.id})`);
          const discoveryResult = await this.service.discoverAllResources(org.id);
          console.log(
            `[Resource Discovery Job] ${org.name}: ` +
            `Discovered ${discoveryResult.resources_discovered}, ` +
            `Updated ${discoveryResult.resources_updated}, ` +
            `Errors: ${discoveryResult.errors.length}`
          );
        } catch (error: any) {
          console.error(`[Resource Discovery Job] Failed for ${org.name}:`, error.message);
          // Continue with next organization even if this one fails
        }
      }
    } finally {
      client.release();
    }
  }

  /**
   * Stop the resource discovery job
   */
  stop(): void {
    if (this.task) {
      this.task.stop();
      this.task = null;
      console.log('[Resource Discovery Job] Stopped');
    }
  }

  /**
   * Check if the job is running
   */
  isRunning(): boolean {
    return this.task !== null;
  }

  /**
   * Manually trigger discovery for all organizations (for testing)
   */
  async triggerManualScan(): Promise<void> {
    console.log('[Resource Discovery Job] Manual scan triggered');
    await this.runDiscoveryForAllOrganizations();
  }
}
