import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses';
import { format } from 'date-fns';
import * as sanitizeHtml from 'sanitize-html';

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
          Html: {
            Charset: 'UTF-8',
            Data: body,
          },
          Text: {
            Charset: 'UTF-8',
            Data: sanitizeHtml(body, { allowedTags: [] }),
          },
        },
      },
    });

    return command;
  }

  createCommentEmail({
    postAuthor,
    postTitle,
    postSlug,
    commentUsername,
    profileImage,
    commentText,
  }: CreateCommentEmailParams) {
    const postLink = `https://wap-dev.store/user/${postAuthor}/post/${postSlug}`;
    const commentUserLink = `https://wap-dev.store/user/${commentUsername}`;

    return `
    <!DOCTYPE html>
    <html lang="ko">
      <head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body
        style="
          font-family: Arial, sans-serif;
          font-size: 16px;
          line-height: 1.5;
          color: #333;
        "
      >
        <table
          cellpadding="0"
          cellspacing="0"
          border="0"
          width="100%"
          bgcolor="#f9f9f9"
        >
          <tr>
            <td align="center">
              <table
                cellpadding="0"
                cellspacing="0"
                border="0"
                width="600"
                style="max-width: 600px"
              >
                <tr>
                  <td
                    align="center"
                    style="background-color: #ffab37; padding: 40px; color: #fff"
                  >
                    <a
                      href="https://wap-dev.store"
                      style="text-decoration: none; color: #fff"
                      ><h1 style="margin: 0; font-size: 36px">Emotions</h1></a
                    >
                    <p style="margin: 20px 0 0; font-size: 18px">
                      새로운 댓글이 달렸습니다.
                    </p>
                  </td>
                </tr>
                <tr>
                  <td style="background-color: #fff; padding: 40px">
                    <a href="${postLink}" style="text-decoration: none">
                      <h2 style="margin: 0; font-size: 24px; color: #ffab37">
                        ${postTitle}
                      </h2>
                    </a>
                    <div style="display: flex; align-items: center; gap: 10px">
                      <div>
                        <a href="${commentUserLink}">
                          <img
                            style="
                              height: 64px;
                              width: 64px;
                              display: block;
                              border-radius: 32px;
                            "
                            src="${profileImage}"
                          />
                        </a>
                      </div>
                      <div>
                        <div
                          style="
                            display: flex;
                            gap: 10px;
                            align-items: center;
                            justify-content: center;
                          "
                        >
                          <div
                            style="margin-top: 10px; font-size: 16px; color: #666; font-weight: 900"
                          >
                            ${commentUsername}
                          </div>
                          <div
                            style="
                              margin-top: 10px;
                              font-size: 12px;
                              color: #adb5bd;
                            "
                          >
                          ${format(
                            new Date(),
                            'yyyy.MM.dd HH:mm:ss',
                          )}                          </div>
                        </div>
                        <div style="font-size: 16px; color: #666">
                          ${commentText}
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td style="background-color: #ffab37; padding: 40px; color: #fff">
                    <a
                      href="https://github.com/neko113/Emotions"
                      style="text-decoration: none; color: #fff"
                    >
                      <p style="margin: 0; font-size: 14px">
                        @neko113 // Follow 및 Star는 개발자에게 큰 힘이 됩니다.
                      </p>
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
    </html>
    
    `;
  }
}

interface EmailParams {
  to: string;
  subject: string;
  body: string;
  from: string;
}

interface CreateCommentEmailParams {
  postAuthor: string;
  postTitle: string;
  postSlug: string;
  commentUsername: string;
  profileImage: string | null;
  commentText: string;
}
