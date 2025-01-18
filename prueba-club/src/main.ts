import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

const logger = new Logger(AppModule.name);
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // * config
  const configService = app.get(ConfigService);
  // * settings
  app.enableCors();
  app.setGlobalPrefix('/api');
  // * swagger
  const documentConfig = new DocumentBuilder()
    .setTitle('API docs')
    .setDescription('Swagger API Documention')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, documentConfig);
  SwaggerModule.setup('/document', app, document, {
    jsonDocumentUrl: '/document.json',
  });
  // * start
  app.enableCors();
  console.log('server port PC', configService.get('SERVER_PORT'));
  await app.listen(configService.get('SERVER_PORT'));
}
bootstrap()
  .then(() => logger.log(`${AppModule.name} is running`))
  .catch((err) => {
    logger.error(`Error: ${err.message}\n`);
    process.exit(1);
  });
