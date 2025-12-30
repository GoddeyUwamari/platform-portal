import { WebSocketServer } from '../websocket/server';

export class DeploymentEvents {
  private wsServer: WebSocketServer;

  constructor(wsServer: WebSocketServer) {
    this.wsServer = wsServer;
  }

  // Emit when deployment status changes
  public deploymentStatusChanged(organizationId: string, deployment: any) {
    this.wsServer.emitToOrganization(organizationId, 'deployment:status', {
      deploymentId: deployment.id,
      serviceId: deployment.service_id,
      status: deployment.status,
      environment: deployment.environment,
      timestamp: new Date(),
    });
  }

  // Emit when new deployment starts
  public deploymentStarted(organizationId: string, deployment: any) {
    this.wsServer.emitToOrganization(organizationId, 'deployment:started', {
      deploymentId: deployment.id,
      serviceName: deployment.service_name,
      environment: deployment.environment,
      deployedBy: deployment.deployed_by,
      timestamp: new Date(),
    });
  }

  // Emit when deployment completes
  public deploymentCompleted(organizationId: string, deployment: any) {
    this.wsServer.emitToOrganization(organizationId, 'deployment:completed', {
      deploymentId: deployment.id,
      serviceName: deployment.service_name,
      status: deployment.status,
      duration: deployment.duration,
      timestamp: new Date(),
    });
  }

  // Emit when deployment fails
  public deploymentFailed(organizationId: string, deployment: any) {
    this.wsServer.emitToOrganization(organizationId, 'deployment:failed', {
      deploymentId: deployment.id,
      serviceName: deployment.service_name,
      error: deployment.error,
      timestamp: new Date(),
    });
  }
}
