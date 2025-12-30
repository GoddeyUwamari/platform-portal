import { CloudWatchLogsClient, FilterLogEventsCommand } from '@aws-sdk/client-cloudwatch-logs';
import { WebSocketServer } from '../websocket/server';

export class LogStreamingService {
  private wsServer: WebSocketServer;
  private cloudwatch: CloudWatchLogsClient;
  private activeStreams: Map<string, NodeJS.Timeout> = new Map();

  constructor(wsServer: WebSocketServer) {
    this.wsServer = wsServer;
    this.cloudwatch = new CloudWatchLogsClient({
      region: process.env.AWS_REGION || 'us-east-1'
    });
  }

  // Start streaming logs for a deployment
  async startLogStream(
    deploymentId: string,
    organizationId: string,
    logGroupName: string,
    logStreamName: string
  ) {
    // Stop existing stream if any
    this.stopLogStream(deploymentId);

    let nextToken: string | undefined;
    let startTime = Date.now() - 60000; // Start from 1 minute ago

    console.log(`📝 Starting log stream for deployment ${deploymentId}`);

    // Poll CloudWatch every 2 seconds
    const interval = setInterval(async () => {
      try {
        const command = new FilterLogEventsCommand({
          logGroupName,
          logStreamNames: [logStreamName],
          nextToken,
          startTime,
          limit: 100,
        });

        const response = await this.cloudwatch.send(command);

        if (response.events && response.events.length > 0) {
          // Emit new log lines to organization
          this.wsServer.emitToOrganization(organizationId, 'logs:stream', {
            deploymentId,
            logs: response.events.map(event => ({
              timestamp: event.timestamp,
              message: event.message,
            })),
          });

          // Update startTime to avoid fetching same logs again
          const lastEvent = response.events[response.events.length - 1];
          if (lastEvent.timestamp) {
            startTime = lastEvent.timestamp + 1;
          }
        }

        nextToken = response.nextToken;

        // Stop streaming if no more logs and no nextToken
        if (!nextToken && response.events?.length === 0) {
          console.log(`📝 No more logs for deployment ${deploymentId}, stopping stream`);
          this.stopLogStream(deploymentId);
        }
      } catch (error: any) {
        console.error('Log streaming error:', error);

        // If log group or stream doesn't exist, emit error and stop
        if (error.name === 'ResourceNotFoundException') {
          this.wsServer.emitToOrganization(organizationId, 'logs:error', {
            deploymentId,
            error: 'Log group or stream not found',
          });
          this.stopLogStream(deploymentId);
        }
      }
    }, 2000);

    this.activeStreams.set(deploymentId, interval);
  }

  // Stop log stream for a specific deployment
  stopLogStream(deploymentId: string) {
    const interval = this.activeStreams.get(deploymentId);
    if (interval) {
      clearInterval(interval);
      this.activeStreams.delete(deploymentId);
      console.log(`📝 Stopped log stream for deployment ${deploymentId}`);
    }
  }

  // Stop all active log streams
  stopAllStreams() {
    this.activeStreams.forEach((interval, deploymentId) => {
      clearInterval(interval);
      console.log(`📝 Stopped log stream for deployment ${deploymentId}`);
    });
    this.activeStreams.clear();
  }

  // Get count of active streams
  getActiveStreamCount(): number {
    return this.activeStreams.size;
  }

  // Check if a deployment has an active stream
  hasActiveStream(deploymentId: string): boolean {
    return this.activeStreams.has(deploymentId);
  }
}
