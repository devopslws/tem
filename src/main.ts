import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ResponseTransformInterceptor } from './configAndGlobalModules/ResponseTransformInterceptor';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  
  const app = await NestFactory.create(AppModule);
  app.useGlobalInterceptors(new ResponseTransformInterceptor());
  app.useGlobalPipes(new ValidationPipe({
      transform: true, //str -> 타입 변환         
      whitelist: true, //dto에 없는 추가변수 무시
      forbidNonWhitelisted: true, //dto에 없는 추가변수 err
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('temperatureApi')
    .setDescription('온도 수집 및 통계조회Api')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  console.log(' swaggerOn >>')
  await app.listen(process.env.PORT ?? 3000);
  

}
bootstrap();
