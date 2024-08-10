import { GetObjectCommand, PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Readable } from 'stream';

@Injectable()
export class CloudStorageService {

    constructor(private readonly configService: ConfigService) { };

    private readonly s3Client = new S3Client({
        region: this.configService.getOrThrow('AWS_S3_REGION')
    })


    async upload(fileName: string, file: Buffer) {
        await this.s3Client.send(new PutObjectCommand({
            Bucket: 'nestjs-upload',
            Key: fileName,
            Body: file
        }));
    }

    async getFile(key: string): Promise<Readable> {
        const command = new GetObjectCommand({
            Bucket: 'nestjs-upload',
            Key: key,
        });

        try {
            const { Body } = await this.s3Client.send(command);
            return Body as Readable;
        } catch (error) {
            throw new NotFoundException(`File with key ${key} not found`);
        }
    }
}
