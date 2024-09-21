import { Controller, Delete, FileTypeValidator, Get, HttpCode, MaxFileSizeValidator, Param, ParseFilePipe, Post, Query, Res, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { CloudStorageService } from './cloud-storage.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { extname } from 'path';
import { AuthGuard } from 'src/auth/guard/auth.guard';

@Controller('cloud-storage')
export class CloudStorageController {

    constructor(private readonly service: CloudStorageService) { };

    @Post(':path/:name')
    @UseInterceptors(FileInterceptor('file'))
    @UseGuards(AuthGuard)
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
        return this.service.upload(newFileName, file.buffer);
    }


    @Get(':path/:name')
    @UseGuards(AuthGuard)
    async getFile(@Param('path') path: string, @Param('name') name: string, @Res() res: Response) {
        const key = `${path}/${name}`;
        const fileStream = await this.service.getFile(key);
        res.setHeader('Content-Type', 'image/jpeg');
        return fileStream.pipe(res);
    }

    @Delete(':path/:name')
    @HttpCode(204)
    async deleteFile(
        @Param('path') path: string,
        @Param('name') name: string
    ): Promise<void> {
        const key = `${path}/${name}`;
        await this.service.deleteFile(key);
    }
}
