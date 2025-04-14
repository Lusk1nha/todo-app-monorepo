import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { PrismaService } from './common/prisma/prisma.service';

import { ConfigService } from '@nestjs/config';
import { HealthCheckResult } from './common/dtos/healthcheck.dto';

@Injectable()
export class AppService implements OnModuleInit {
  private readonly logger = new Logger(AppService.name);
  private readonly serviceName: string;
  private readonly serviceVersion: string;

  constructor(
    private readonly prisma: PrismaService,
    private readonly configService: ConfigService,
  ) {
    this.serviceName = this.configService.get<string>('SERVICE_NAME', 'API Service');
    this.serviceVersion = this.configService.get<string>('SERVICE_VERSION', '1.0.0');
  }

  onModuleInit() {
    this.logger.log(`${this.serviceName} v${this.serviceVersion} initialized`);
  }

  /**
   * Performs a comprehensive health check of the application
   * @returns Promise<HealthCheckResult> Detailed health status
   */
  async getHealthCheck(): Promise<HealthCheckResult> {
    this.logger.debug('Performing comprehensive health check...');

    const checks = {
      database: false,
      memoryUsage: this.checkMemoryUsage(),
      uptime: process.uptime(),
    };

    try {
      checks.database = await Promise.race([
        this.checkDatabaseConnection(),
        new Promise<boolean>((resolve) => setTimeout(() => resolve(false), 2000)),
      ]);

      const status = checks.database ? 'healthy' : 'degraded';
      const details = {
        status,
        ...checks,
        service: this.serviceName,
        version: this.serviceVersion,
        timestamp: new Date().toISOString(),
      };

      if (status === 'healthy') {
        this.logger.log('Health check completed: System is healthy');
      } else {
        this.logger.warn('Health check completed: System is degraded');
      }

      return details as any;
    } catch (error) {
      this.logger.error(`Health check failed: ${error.message}`);
      throw {
        status: 'unhealthy',
        error: error.message,
        service: this.serviceName,
        version: this.serviceVersion,
        timestamp: new Date().toISOString(),
      };
    }
  }

  /**
   * Checks database connection health
   * @returns Promise<boolean> Connection status
   */
  private async checkDatabaseConnection(): Promise<boolean> {
    try {
      await this.prisma.$queryRaw`SELECT 1`;
      this.logger.debug('Database connection is healthy');
      return true;
    } catch (error) {
      this.logger.error('Database connection check failed', error.stack);
      return false;
    }
  }

  /**
   * Checks memory usage statistics
   * @returns MemoryUsage object with usage details
   */
  private checkMemoryUsage(): {
    rss: string;
    heapTotal: string;
    heapUsed: string;
    external: string;
  } {
    const memoryUsage = process.memoryUsage();
    const format = (bytes: number) => `${(bytes / 1024 / 1024).toFixed(2)} MB`;

    return {
      rss: format(memoryUsage.rss),
      heapTotal: format(memoryUsage.heapTotal),
      heapUsed: format(memoryUsage.heapUsed),
      external: format(memoryUsage.external),
    };
  }
}
