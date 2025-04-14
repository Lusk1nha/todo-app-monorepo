import { Test, TestingModule } from '@nestjs/testing';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ApplicationVersionResponse, HealthCheckResult } from './common/dtos/healthcheck.dto';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  it('should return health-check result', () => {
    expect(appController.checkSystemHealth()).toBeInstanceOf(HealthCheckResult);
  });

  it('should return application version', () => {
    expect(appController.getVersionInfo()).toBeInstanceOf(ApplicationVersionResponse);
  });
});
