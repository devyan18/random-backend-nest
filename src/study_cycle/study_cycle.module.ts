import { Module } from '@nestjs/common';
import { StudyCycleService } from './study_cycle.service';
import { StudyCycleController } from './study_cycle.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { StudyCycle, StudyCycleSchema } from './schemas/study_cycle.schema';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    UsersModule,
    MongooseModule.forFeature([
      { name: StudyCycle.name, schema: StudyCycleSchema },
    ]),
  ],
  controllers: [StudyCycleController],
  providers: [StudyCycleService],
})
export class StudyCycleModule {}
