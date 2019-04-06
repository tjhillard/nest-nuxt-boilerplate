import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';

import * as helmet from 'helmet';
import * as rateLimit from 'express-rate-limit';
import * as cors from 'cors';

import { AppModule } from './app.module';
import { EntityNotFoundErrorFilter } from './shared/application/filters/entity-not-found.filter';

const port = process.env.PORT || 3001;
declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // App config
  app.setGlobalPrefix('/api');
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new EntityNotFoundErrorFilter());

  app.use(cors());
  app.use(helmet());
  app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 1000 }));
  app.enableCors();

  // Start express server
  await app.listen(port);
  Logger.log(`Server running on http://localhost:${port}  🚀`, 'bootstrap()');

  // Webpack HMR
  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}

bootstrap();
