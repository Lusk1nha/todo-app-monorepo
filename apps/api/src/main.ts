import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

const port = process.env.PORT ?? 8000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configSwagger = new DocumentBuilder()
    .setTitle('Todo APP - API Documentation')
    .setDescription('API Documentation')
    .setVersion('1.0')
    .addTag('api')
    .addBearerAuth()
    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, configSwagger);
  SwaggerModule.setup('api', app, documentFactory, {
    jsonDocumentUrl: 'swagger/json',
  });

  await app.listen(port, '0.0.0.0');
}
bootstrap();
