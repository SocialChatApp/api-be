import { Catch, ArgumentsHost, HttpStatus, HttpException } from "@nestjs/common";

import { BaseExceptionFilter } from "@nestjs/core";
import { Request, Response } from "express";
import { LoggerService } from "src/logger/logger.service";
import { PrismaClientKnownRequestError, PrismaClientUnknownRequestError, PrismaClientValidationError } from "@prisma/client/runtime/library";

type ResponseObj = {
    statusCode: number,
    timestamp: string,
    path: string,
    response: string | object
}


@Catch()
export class AllExceptionFilters extends BaseExceptionFilter {
    private readonly logger = new LoggerService(AllExceptionFilters.name);

    catch(exception: unknown, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();

        const myResponseObj: ResponseObj = {
            statusCode: 500,
            timestamp: new Date().toISOString(),
            path: request.url,
            response: ''
        }
        if (exception instanceof HttpException) {
            myResponseObj.statusCode = exception.getStatus();
            myResponseObj.response = exception.getResponse();
        }
        else if (exception instanceof PrismaClientValidationError) {
            myResponseObj.statusCode = 402;
            myResponseObj.response = exception.message.replaceAll(/\n/g, '');
        }
        else {
            myResponseObj.statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
            myResponseObj.response = 'INTERNAL SERVER ERROR';
        }

        response
            .status(myResponseObj.statusCode)
            .json({ response: myResponseObj.response });

        this.logger.error(myResponseObj.response, AllExceptionFilters.name);

        super.catch(exception, host);
    }
}