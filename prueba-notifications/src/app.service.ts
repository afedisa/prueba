import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Resend } from 'resend';

@Injectable()
export class AppService {
  constructor(private configService: ConfigService) {}
  async sendEmail(msg) {
    const resend = new Resend(
      this.configService.get<string>('RESEND_EMAIL_APP_KEY'),
    );

    const { data, error } = await resend.emails.send({
      from: msg.from || 'club@resend.dev',
      to: msg.to,
      subject: msg.subject || 'Hello World',
      html:
        msg.message ||
        '<p>Felicidades por enviar su  <strong>primer email</strong>!</p>',
    });
    if (error) {
      console.error({ error });
      return error;
    }
    return data;
  }
}
