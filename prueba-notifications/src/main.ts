import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import * as dotenv from 'dotenv';

import { Logger } from '@nestjs/common';
const logger = new Logger(AppModule.name);

async function bootstrap() {
  dotenv.config({ path: `./.env` });
  console.log('RABBIT_MQ_URI PN', process.env.RABBIT_MQ_URI);
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.RMQ,
      options: {
        urls: [process.env.RABBIT_MQ_URI],
        queue: 'notifications_queue',
        prefetchCount: 1,
        persistent: true,
        noAck: false,
        queueOptions: {
          durable: true,
        },
        socketOptions: {
          heartbeatIntervalInSeconds: 60,
          reconnectTimeInSeconds: 5,
        },
      },
    },
  );
  await app.listen();
}
bootstrap()
  .then(() => logger.log(`${AppModule.name} is running`))
  .catch((err) => {
    logger.error(`Error: ${err.message}\n`);
    process.exit(1);
  });
