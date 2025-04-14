import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import {
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiOkResponse,
  ApiServiceUnavailableResponse,
  ApiInternalServerErrorResponse,
} from '@nestjs/swagger';
import { ApplicationVersionResponse, HealthCheckResult } from './common/dtos/healthcheck.dto';
import { HttpStatus } from '@nestjs/common/enums';

@Controller()
@ApiTags('System')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get(['health', 'ready', 'live'])
  @ApiOperation({
    summary: 'System Health Status',
    description: `
      Comprehensive health check endpoint that can be used for:
      - Kubernetes liveness probes (/live)
      - Kubernetes readiness probes (/ready)
      - General health monitoring (/health)
      
      Returns detailed system status including:
      - Database connectivity
      - Memory usage
      - Service uptime
      - Version information
    `,
  })
  @ApiOkResponse({
    type: HealthCheckResult,
    description: 'System is fully operational',
  })
  @ApiResponse({
    status: HttpStatus.BAD_GATEWAY,
    description: 'System is degraded - non-critical components failing',
    type: HealthCheckResult,
  })
  @ApiInternalServerErrorResponse({
    description: 'System is unavailable - critical failure',
    type: HealthCheckResult,
  })
  @ApiServiceUnavailableResponse({
    description: 'System is temporarily unavailable',
    type: HealthCheckResult,
  })
  async checkSystemHealth(): Promise<HealthCheckResult> {
    return this.appService.getHealthCheck();
  }

  @Get('version')
  @ApiOperation({
    summary: 'Service Version',
    description: 'Get current service version information',
  })
  @ApiOkResponse({
    type: ApplicationVersionResponse,
    description: 'Version information retrieved successfully',
  })
  async getVersionInfo(): Promise<ApplicationVersionResponse> {
    const healthData = await this.appService.getHealthCheck();
    return {
      service: healthData.service,
      version: healthData.version,
    };
  }
}
