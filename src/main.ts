import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as fs from 'fs';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe())
  app.setGlobalPrefix('api');
  const config = new DocumentBuilder()
    .setTitle('RSVP API')
    .setDescription('RSVP implementation')
    .setVersion('1.0.0')
    .addTag('RSVP')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  fs.writeFileSync('./swagger-spec.json', JSON.stringify(document));
  SwaggerModule.setup('api', app, document);
  app.enableCors();
  await app.listen(process.env.API_PORT);
}
bootstrap();
