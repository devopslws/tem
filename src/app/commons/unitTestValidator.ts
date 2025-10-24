import { ValidationPipe, BadRequestException } from '@nestjs/common';

export async function validateDto<T>(dto: T, dtoClass: new () => T) {
  const pipe = new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true });
  try {
    return await pipe.transform(dto, {
      type: 'body',
      metatype: dtoClass,
    });
  } catch (e) {
    if (e instanceof BadRequestException) {
      throw e;
    }
    throw new Error('Unexpected validation error');
  }
}
