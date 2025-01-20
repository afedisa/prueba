import { Controller } from '@nestjs/common';
import { AppService } from './app.service';
import {
  Ctx,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern('newPlayer')
  async handleQueueClubsMessageNewPlayer(
    @Payload() data: any,
    @Ctx() context: RmqContext,
  ) {
    console.log('Message from newPlayer:', data);
    const channel = context.getChannelRef();
    const originalMessage = context.getMessage();
    try {
      channel.ack(originalMessage);
      const msg = {
        to: process.env.RESEND_EMAIL_APP_EMAIL,
        subject: 'Nuevo jugador',
        message: `Se ha dado de alta a un nuevo jugador de ${data.club}`,
      };
      this.appService.sendEmail(msg).then((res) => {
        return res;
      });
    } catch (err) {
      console.error('Error al procesar el mensaje:', err);
      channel.nack(originalMessage);
      return err;
    }
  }

  @MessagePattern('endPlayer')
  async handleQueueClubsMessageFirePlayer(
    @Payload() data: any,
    @Ctx() context: RmqContext,
  ) {
    console.log('Message from endPlayer:', data);
    const channel = context.getChannelRef();
    const originalMessage = context.getMessage();
    try {
      console.log('Mensaje recibido:', data);
      channel.ack(originalMessage);
      const msg = {
        to: 'asierfd@gmail.com',
        subject: 'Salida jugador',
        message: `Se ha dado de baja a ${data.player} como jugador de ${data.club}`,
      };
      this.appService.sendEmail(msg).then((res) => {
        return res;
      });
    } catch (err) {
      console.error('Error al procesar el mensaje:', err);
      channel.nack(originalMessage);
      return err;
    }
  }

  @MessagePattern('newTrainer')
  async handleQueueClubsMessageNewTrainer(
    @Payload() data: any,
    @Ctx() context: RmqContext,
  ) {
    console.log('Message from newTrainer:', data);
    console.log(
      'process.env.RESEND_EMAIL_APP_EMAIL',
      process.env.RESEND_EMAIL_APP_EMAIL,
    );
    const channel = context.getChannelRef();
    const originalMessage = context.getMessage();
    try {
      channel.ack(originalMessage);
      const msg = {
        to: process.env.RESEND_EMAIL_APP_EMAIL,
        subject: 'Nuevo entrenador',
        message: `Se ha dado de alta a un nuevo entrenador de ${data.club}`,
      };
      this.appService.sendEmail(msg).then((res) => {
        return res;
      });
    } catch (err) {
      console.error('Error al procesar el mensaje:', err);
      channel.nack(originalMessage);
      return err;
    }
  }

  @MessagePattern('endTrainer')
  async handleQueueClubsMessageFireTrainer(
    @Payload() data: any,
    @Ctx() context: RmqContext,
  ) {
    console.log('Message from getPlayers:', data);
    const channel = context.getChannelRef();
    const originalMessage = context.getMessage();
    try {
      console.log('Mensaje recibido:', data);
      channel.ack(originalMessage);
      const msg = {
        to: 'asierfd@gmail.com',
        subject: 'Salida entrenador',
        message: `Se ha dado de baja a ${data.trainer} como entrenador de ${data.club}`,
      };
      this.appService.sendEmail(msg).then((res) => {
        return res;
      });
    } catch (err) {
      console.error('Error al procesar el mensaje:', err);
      channel.nack(originalMessage);
      return err;
    }
  }
}
