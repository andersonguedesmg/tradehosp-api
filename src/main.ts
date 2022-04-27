import { ValidationPipe } from './core/pipes/validation.pipe';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api/v1');

  app.useGlobalPipes(new ValidationPipe());

  app.use(helmet());

  app.enableCors();

  const config = new DocumentBuilder()
    .setTitle('TradeHosp')
    .setDescription(
      'API de uma plataforma que tem o objetivo facilitar a doação e/ou empréstimo de insumos hospitalares.',
    )
    .setVersion('1.0.0')
    .addTag('TradeHosp')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/v1/swagger', app, document);

  await app.listen(3000);

  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
