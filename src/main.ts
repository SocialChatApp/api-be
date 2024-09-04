import { NestFactory, HttpAdapterHost } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { AllExceptionFilters } from './auth/all-exceptions.filter';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new AllExceptionFilters(httpAdapter));

  app.useGlobalPipes(new ValidationPipe());

  app.enableCors({
    origin: '*'
  })

  await app.listen(3000);
}
bootstrap();
