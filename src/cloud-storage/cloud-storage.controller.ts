import { Controller, FileTypeValidator, Get, MaxFileSizeValidator, ParseFilePipe, Post, Query, UploadedFile, UseInterceptors } from '@nestjs/common';
import { CloudStorageService } from './cloud-storage.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('cloud-storage')
export class CloudStorageController {

    constructor(private readonly service: CloudStorageService) { };

    @Post()
    @UseInterceptors(FileInterceptor('file'))
    uploadFile(
        @Query('path') path: string,
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

        this.service.upload(path + "/" + file.originalname, file.buffer);
    }
}
