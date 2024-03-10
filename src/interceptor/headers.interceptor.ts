import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class HeadersInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      tap(() => {
        const response = context.switchToHttp().getResponse();
        // Remove a  header that contain timestamp information
        response.removeHeader('Date');

        // // Or set a custom header to obfuscate server details
        // response.setHeader('Server', 'SecureServer');
      }),
    );
  }
}