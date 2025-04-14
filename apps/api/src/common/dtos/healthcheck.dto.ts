import { ApiProperty } from '@nestjs/swagger';

export class MemoryUsage {
  @ApiProperty({
    description: 'Resident Set Size (memória total usada)',
  })
  rss: string; // Resident Set Size (memória total usada)

  @ApiProperty({
    description: 'Total de heap alocado',
  })
  heapTotal: string; // Total de heap alocado

  @ApiProperty({
    description: 'Heap realmente utilizado',
  })
  heapUsed: string; // Heap realmente utilizado

  @ApiProperty({
    description: 'Memória usada por objetos C++ vinculados',
  })
  external: string; // Memória usada por objetos C++ vinculados
}

export class CheckResult {
  @ApiProperty({
    description: 'Check name',
  })
  database: string;

  @ApiProperty({
    description: 'Check status',
  })
  memoryUsage: MemoryUsage;
}

export class HealthCheckResult {
  @ApiProperty({
    enum: ['healthy', 'degraded', 'unhealthy'],
    description: 'Service status',
  })
  status: 'healthy' | 'degraded' | 'unhealthy';

  @ApiProperty({
    description: 'Service name',
  })
  service: string;

  @ApiProperty({
    description: 'Service version',
  })
  version: string;

  @ApiProperty({
    description: 'Timestamp of the health check',
  })
  timestamp: string;

  @ApiProperty({
    description: 'Uptime in seconds',
  })
  uptime: number;

  @ApiProperty({
    description: 'Memory usage statistics',
  })
  checks: CheckResult;

  @ApiProperty({
    description: 'Error message if any',
  })
  error?: string;
}

export class ApplicationVersionResponse {
  @ApiProperty({
    description: 'Service name',
  })
  service: string;

  @ApiProperty({
    description: 'Service version',
  })
  version: string;
}
