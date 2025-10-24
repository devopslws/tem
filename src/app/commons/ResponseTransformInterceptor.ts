import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable, map } from 'rxjs';

//의도적인 null반환은 data를 빼준다
@Injectable()
export class ResponseTransformInterceptor<T>
  implements NestInterceptor<T, any>
{
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        
        if (data === null || data === undefined) {
          return {
            message: 'success',
          };
        }

        return {
          message: 'success',
          data,
        };
      }),
    );
  }
}
