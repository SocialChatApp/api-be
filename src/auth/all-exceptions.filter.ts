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
            // myResponseObj.statusCode = 402;
            // myResponseObj.response = exception.message.replaceAll(/\n/g, '');

            myResponseObj.statusCode = HttpStatus.BAD_REQUEST;
            myResponseObj.response = `Validation error: ${exception.message}`;
        }
        else if (exception instanceof PrismaClientKnownRequestError) {
            if (exception.code === 'P2002') {
                myResponseObj.statusCode = HttpStatus.CONFLICT;
                myResponseObj.response = `Unique constraint violation: ${exception.meta?.target} already exists.`;
            }
            else if (exception.code == 'P2003') {
                myResponseObj.statusCode = HttpStatus.BAD_REQUEST;
                myResponseObj.response = `Foreign key constraint violation: ${exception.message}`;
            }
            else if (exception.code == 'P2004') {
                myResponseObj.statusCode = HttpStatus.BAD_REQUEST;
                myResponseObj.response = `Failed to update row: ${exception.meta?.target}.`;
            }
            else {
                myResponseObj.statusCode = HttpStatus.BAD_REQUEST;
                myResponseObj.response = exception.message;
            }
        }
        else if (exception instanceof PrismaClientUnknownRequestError) {
            myResponseObj.statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
            myResponseObj.response = `Unknown error: ${exception.message}`;
        }
        else {
            myResponseObj.statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
            myResponseObj.response = 'INTERNAL SERVER ERROR';
        }

        response
            .status(myResponseObj.statusCode)
            .json({ response: myResponseObj.response });

        let errorMessage = myResponseObj.response;
        if (typeof myResponseObj.response === 'object' && 'message' in myResponseObj.response && Array.isArray(myResponseObj.response['message'])) {
            errorMessage = myResponseObj.response['message'].join(', ');
        } else {
            errorMessage = String(myResponseObj.response);
        }

        const logMessage = `Endpoint: ${myResponseObj.path} | StatusCode: ${myResponseObj.statusCode} | Error: ${errorMessage}`;
        this.logger.error(logMessage, AllExceptionFilters.name);

        super.catch(exception, host);
    }
}