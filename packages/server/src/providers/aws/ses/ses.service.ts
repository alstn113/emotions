import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses';

@Injectable()
export class SESService {
  private readonly sesClient: SESClient;

  constructor(private readonly configService: ConfigService) {
    this.sesClient = new SESClient({
      region: this.configService.get('AWS_SES_REGION'),
    });
  }

  async sendEmail(params: EmailParams) {
    try {
      const command = this.createSendEmailCommand(params);
      await this.sesClient.send(command);
    } catch (error) {
      console.error(error);
    }
  }

  private createSendEmailCommand({ body, from, subject, to }: EmailParams) {
    const command = new SendEmailCommand({
      // 받는 사람
      Destination: {
        ToAddresses: [to],
      },
      // 보내는 사람
      Source: from,
      // 메일 내용 (제목, 내용)
      Message: {
        Subject: {
          Charset: 'UTF-8',
          Data: subject,
        },
        Body: {
          Text: {
            Charset: 'UTF-8',
            Data: body,
          },
        },
      },
    });

    console.log(command);

    return command;
  }
}

type EmailParams = {
  to: string;
  subject: string;
  body: string;
  from: string;
};
