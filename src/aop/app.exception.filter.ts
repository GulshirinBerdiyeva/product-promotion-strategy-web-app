import {ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus} from "@nestjs/common";
import {AppLogger} from "./app.logger";

@Catch()
export class AppExceptionFilter implements ExceptionFilter {

    constructor(private readonly logger: AppLogger) {}

    catch(exception: Error, host: ArgumentsHost): any {
        const ctx = host.switchToHttp();
        const request = ctx.getRequest();
        const response = ctx.getResponse();

        const statusCode = exception instanceof HttpException ? exception.getStatus() : HttpStatus.BAD_REQUEST;
        const message = exception instanceof HttpException ?  exception.message : 'Internal server error';

        const devErrorResponse: any = {
            statusCode,
            timestamp: new Date().toISOString(),
            path: request.url,
            method: request.method,
            errorName: exception?.name,
            message: exception?.message
        };

        const prodErrorResponse: any = {
            statusCode,
            message
        };

        this.logger.error( `request method: ${request.method} request url${request.url}`, JSON.stringify(devErrorResponse));

        response.status(statusCode).json( process.env.NODE_ENV === 'development' ? devErrorResponse: prodErrorResponse);
    }
}