import { Module } from '@nestjs/common';
import { AssistsService } from './assists.service';
import { AssistsController } from './assists.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Assist, AssistSchema } from './schemas/assist.schema';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    UsersModule,
    MongooseModule.forFeature([{ name: Assist.name, schema: AssistSchema }]),
  ],
  controllers: [AssistsController],
  providers: [AssistsService],
})
export class AssistsModule {}
