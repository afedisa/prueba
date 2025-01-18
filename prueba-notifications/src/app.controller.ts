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
  async handleQueueClubsMessageTest(
    @Payload() data: any,
    @Ctx() context: RmqContext,
  ) {
    console.log('Message from newPlayer:', data);
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
        subject: 'Nuevo jugador',
        message: `Se ha dado de alta a ${data.player} como un nuevo jugador de ${data.club}`,
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

  @MessagePattern('deletePlayer')
  async handleQueuePlayersMessageTest(
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
}
