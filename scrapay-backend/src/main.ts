import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { ValidationError } from 'class-validator';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {

  
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const port = configService.get<number>('app.port');
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors({
    origin: configService.get('cors.origin'),
    methods: configService.get('cors.methods'),
  });


  app.listen(port, '0.0.0.0', () => {
    console.log(`Listening at port ${port}`);
  });
}
bootstrap();
