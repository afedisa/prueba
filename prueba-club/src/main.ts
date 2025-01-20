import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { writeFileSync } from 'fs';

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
    jsonDocumentUrl: '/swagger-doc.json',
  });
  // Opción adicional: Guardar el archivo en el sistema
  writeFileSync('./swagger-doc.json', JSON.stringify(document, null, 2));

  // * start
  app.enableCors();
  
  // Activa la validación global
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Elimina propiedades que no están definidas en el DTO
      forbidNonWhitelisted: true, // Rechaza propiedades no definidas
      transform: true, // Transforma los datos al tipo especificado en el DTO
    }),
  );

  await app.listen(configService.get('SERVER_PORT'));
}
bootstrap()
  .then(() => logger.log(`${AppModule.name} is running`))
  .catch((err) => {
    logger.error(`Error: ${err.message}\n`);
    process.exit(1);
  });
