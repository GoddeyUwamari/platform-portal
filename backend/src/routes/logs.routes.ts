import { Router, Request, Response } from 'express';
import { authenticate } from '../middleware/auth.middleware';
import { LogStreamingService } from '../services/logStreaming';
import { WebSocketServer } from '../websocket/server';

const router = Router();

// Extend Request type to include WebSocket server
interface RequestWithWS extends Request {
  app: any;
}

// Start log stream for deployment
router.post('/logs/stream/:deploymentId', authenticate, async (req: RequestWithWS, res: Response) => {
  try {
    const { deploymentId } = req.params;
    const { logGroupName, logStreamName } = req.body;

    if (!logGroupName || !logStreamName) {
      return res.status(400).json({
        success: false,
        error: 'logGroupName and logStreamName are required',
      });
    }

    const wsServer: WebSocketServer = req.app.get('wsServer');
    const logService = new LogStreamingService(wsServer);

    await logService.startLogStream(
      deploymentId,
      (req as any).organizationId,
      logGroupName,
      logStreamName
    );

    res.json({
      success: true,
      message: 'Log streaming started',
      deploymentId,
    });
  } catch (error: any) {
    console.error('Error starting log stream:', error);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

// Stop log stream
router.post('/logs/stop/:deploymentId', authenticate, async (req: RequestWithWS, res: Response) => {
  try {
    const { deploymentId } = req.params;

    const wsServer: WebSocketServer = req.app.get('wsServer');
    const logService = new LogStreamingService(wsServer);

    logService.stopLogStream(deploymentId);

    res.json({
      success: true,
      message: 'Log streaming stopped',
      deploymentId,
    });
  } catch (error: any) {
    console.error('Error stopping log stream:', error);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

// Get active streams count
router.get('/logs/streams/active', authenticate, async (req: RequestWithWS, res: Response) => {
  try {
    const wsServer: WebSocketServer = req.app.get('wsServer');
    const logService = new LogStreamingService(wsServer);

    const activeCount = logService.getActiveStreamCount();

    res.json({
      success: true,
      activeStreams: activeCount,
    });
  } catch (error: any) {
    console.error('Error getting active streams:', error);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

export default router;
