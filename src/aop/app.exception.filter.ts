import {ArgumentsHost, Catch, ExceptionFilter, HttpStatus} from "@nestjs/common";
import {AppLogger} from "./app.logger";

@Catch()
export class AppExceptionFilter implements ExceptionFilter {
    constructor(private readonly logger: AppLogger) {
    }

    catch(exception: any, host: ArgumentsHost): any {
        let message = exception.response !== undefined ? exception.response.message : exception.message;
        let statusCode = exception.status !== undefined ? exception.status : HttpStatus.INTERNAL_SERVER_ERROR;

        const ctx = host.switchToHttp();
        const request = ctx.getRequest();
        const response = ctx.getResponse();

        const responseBody: any = {
            statusCode: statusCode,
            message: message,
            timestamp: new Date().toISOString(),
            path: request.url
        };

        response.status(statusCode).json(responseBody);
        this.logger.error(`Request method: ${request.method} Request url${request.url}`, JSON.stringify(responseBody));
    }

}