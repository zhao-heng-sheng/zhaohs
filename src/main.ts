import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { log } from 'console';
import * as fs from 'fs';
import * as path from 'path';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
const httpsOptions = {
  ca: fs.readFileSync(path.join(__dirname, '../secrets/root_bundle.crt')),
  key: fs.readFileSync(path.join(__dirname, '../secrets/zhaohs.cn.key')),
  cert: fs.readFileSync(path.join(__dirname, '../secrets/zhaohs.cn.crt')),
};

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true, httpsOptions });
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
  await app.listen(3000);
  // https.createServer(httpsOptions, server).listen(443);
  log('https://localhost:3000');
}
bootstrap();
