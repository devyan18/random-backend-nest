import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import { AppService } from './app.service';
import { Module } from '@nestjs/common';

import { StudyCycleModule } from './study_cycle/study_cycle.module';
import { SubjectsModule } from './subjects/subjects.module';
import { PeriodsModule } from './periods/periods.module';
import { AssistsModule } from './assists/assists.module';
import { CareersModule } from './careers/careers.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

import environments from './config/environments';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(environments.database.mongo, {
      connectionFactory: (connection) => {
        connection.plugin(require('mongoose-autopopulate'));
        return connection;
      },
    }),
    UsersModule,
    AuthModule,
    SubjectsModule,
    CareersModule,
    AssistsModule,
    PeriodsModule,
    StudyCycleModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
