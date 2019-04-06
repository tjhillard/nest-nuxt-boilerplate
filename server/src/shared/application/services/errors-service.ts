import { HttpStatus } from '@nestjs/common';
import { Request } from 'express';

export class ErrorsService {
  public static notFound(request: Request) {
    return {
      statusCode: HttpStatus.NOT_FOUND,
      message: 'Not found',
      path: request.path,
      method: request.method,
    };
  }
}
