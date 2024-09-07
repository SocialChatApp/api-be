import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailerService {

    private transporter;

    constructor() {
        this.transporter = nodemailer.createTransport({
            service: 'gmail', // Örnek olarak Gmail kullanıyorum
            auth: {
                user: 'developersukru@gmail.com',
                pass: 'tnwf wynt kdbx gdki',
            },
        });
    }

    async sendMail(to: string, subject: string, text: string) {
        const mailOptions = {
            from: 'developersukru@gmail.com',
            to,
            subject,
            text,
        };

        const info = await this.transporter.sendMail(mailOptions);
    }
}
