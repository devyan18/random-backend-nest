import { Module } from '@nestjs/common';
import { PeriodsService } from './periods.service';
import { PeriodsController } from './periods.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Period, PeriodSchema } from './schemas/period.schema';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    UsersModule,
    MongooseModule.forFeature([{ name: Period.name, schema: PeriodSchema }]),
  ],
  controllers: [PeriodsController],
  providers: [PeriodsService],
})
export class PeriodsModule {}
