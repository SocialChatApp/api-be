import { Controller, FileTypeValidator, Get, MaxFileSizeValidator, Param, ParseFilePipe, Post, Query, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { CloudStorageService } from './cloud-storage.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { extname } from 'path';

@Controller('cloud-storage')
export class CloudStorageController {

    constructor(private readonly service: CloudStorageService) { };

    @Post(':path/:name')
    @UseInterceptors(FileInterceptor('file'))
    uploadFile(
        @Param('path') path: string,
        @Param('name') name: string,
        @UploadedFile(new ParseFilePipe({
            validators: [
                // new MaxFileSizeValidator({
                //     maxSize: 1000
                // }),
                new FileTypeValidator({
                    fileType: /image\/(jpeg|png)/
                }),
            ]
        }))
        file: Express.Multer.File) {

        const fileExtension = extname(file.originalname);
        const newFileName = `${path}/${name}${fileExtension}`;
        console.log(newFileName);
        this.service.upload(newFileName, file.buffer);
    }


    @Get(':path/:name')
    async getFile(@Param('path') path: string, @Param('name') name: string, @Res() res: Response) {
        const key = `${path}/${name}`;
        const fileStream = await this.service.getFile(key);
        res.setHeader('Content-Type', 'image/jpeg');
        return fileStream.pipe(res);
    }
}
