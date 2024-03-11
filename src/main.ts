import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as fs from 'fs';
import * as path from 'path';
import * as express from 'express';
import * as https from 'https';
import * as http from 'http';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ExpressAdapter } from '@nestjs/platform-express';
const httpsOptions = {
  ca: fs.readFileSync(path.join(__dirname, '../secrets/root_bundle.crt')),
  key: fs.readFileSync(path.join(__dirname, '../secrets/zhaohs.cn.key')),
  cert: fs.readFileSync(path.join(__dirname, '../secrets/zhaohs.cn.crt')),
};

async function bootstrap() {
  const server = express();
  const app = await NestFactory.create(AppModule, new ExpressAdapter(server), {
    cors: true,
  });
  // const app = await NestFactory.create(AppModule, { cors: true, httpsOptions });
  //swagger
  const config = new DocumentBuilder()
    .setTitle('zhaohs swagger')
    .setDescription('swagger文档')
    .setVersion('1.0')
    .addTag('xxx')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('doc', app, document);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  await app.init();
  const configService = app.get(ConfigService);
  // await app.listen(configService.get('nest_server_port') || 3000);
  process.env.NODE_ENV === 'production'
    ? https
        .createServer(httpsOptions, server)
        .listen(configService.get('nest_server_port') || 3000)
    : http
        .createServer(server)
        .listen(configService.get('nest_server_port') || 3000);
}
bootstrap();
