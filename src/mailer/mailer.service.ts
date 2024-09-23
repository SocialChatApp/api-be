import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailerService {

    private transporter;

    constructor() {
        this.transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'your-e-mail',
                pass: 'your-secret-pass',
            },
        });
    }

    async sendMail(to: string, subject: string, text: string) {
        const mailOptions = {
            from: 'your-e-mail',
            to,
            subject,
            text,
        };

        const info = await this.transporter.sendMail(mailOptions);
    }
}
