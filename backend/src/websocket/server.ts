import { Server as HTTPServer } from 'http';
import { Server as SocketIOServer, Socket } from 'socket.io';
import * as jwt from 'jsonwebtoken';

interface AuthenticatedSocket extends Socket {
  userId: string;
  organizationId: string;
  email: string;
}

export class WebSocketServer {
  private io: SocketIOServer;

  constructor(httpServer: HTTPServer) {
    this.io = new SocketIOServer(httpServer, {
      cors: {
        origin: process.env.FRONTEND_URL || 'http://localhost:3010',
        credentials: true,
      },
      // Use namespaces for organization isolation
      path: '/socket.io',
    });

    this.setupMiddleware();
    this.setupEventHandlers();
  }

  private setupMiddleware() {
    // JWT authentication on WebSocket handshake
    this.io.use(async (socket: any, next) => {
      try {
        const token = socket.handshake.auth.token;

        if (!token) {
          return next(new Error('Authentication token required'));
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any;

        // Attach user info to socket
        socket.userId = decoded.userId;
        socket.organizationId = decoded.organizationId;
        socket.email = decoded.email;

        next();
      } catch (error) {
        next(new Error('Authentication failed'));
      }
    });
  }

  private setupEventHandlers() {
    this.io.on('connection', (socket: Socket) => {
      const authSocket = socket as any as AuthenticatedSocket;
      console.log(`✅ WebSocket connected: ${authSocket.email} (${authSocket.organizationId})`);

      // Join organization-specific room for data isolation
      const orgRoom = `org:${authSocket.organizationId}`;
      socket.join(orgRoom);

      // Handle disconnection
      socket.on('disconnect', (reason) => {
        console.log(`❌ WebSocket disconnected: ${authSocket.email} - ${reason}`);
      });

      // Handle errors
      socket.on('error', (error) => {
        console.error('WebSocket error:', error);
      });

      // Heartbeat for connection monitoring
      socket.on('ping', () => {
        socket.emit('pong');
      });
    });
  }

  // Broadcast to specific organization
  public emitToOrganization(organizationId: string, event: string, data: any) {
    this.io.to(`org:${organizationId}`).emit(event, data);
  }

  // Broadcast to all clients
  public broadcast(event: string, data: any) {
    this.io.emit(event, data);
  }

  // Get connected clients count for organization
  public getOrgConnections(organizationId: string): number {
    const orgRoom = `org:${organizationId}`;
    return this.io.sockets.adapter.rooms.get(orgRoom)?.size || 0;
  }
}
