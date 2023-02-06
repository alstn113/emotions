import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  DeleteObjectCommand,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';
@Injectable()
export class S3Service {
  s3Client: S3Client;
  bucket: string;
  constructor(private readonly configService: ConfigService) {
    this.s3Client = new S3Client({
      region: this.configService.get<string>('AWS_S3_REGION'),
      credentials: {
        accessKeyId: this.configService.get<string>('AWS_S3_ACCESS_KEY'),
        secretAccessKey: this.configService.get<string>('AWS_S3_SECRET_KEY'),
      },
    });
    this.bucket = this.configService.get<string>('AWS_S3_BUCKET');
  }

  async pubObject(filename: string, file: Express.Multer.File) {
    const command = new PutObjectCommand({
      Bucket: this.bucket,
      Key: filename,
      Body: file.buffer,
    });
    return await this.s3Client.send(command);
  }

  async deleteObject(filename: string) {
    const command = new DeleteObjectCommand({
      Bucket: this.bucket,
      Key: filename,
    });
    return await this.s3Client.send(command);
  }
}
