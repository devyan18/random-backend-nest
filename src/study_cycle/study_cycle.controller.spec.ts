import { Test, TestingModule } from '@nestjs/testing';
import { StudyCycleController } from './study_cycle.controller';
import { StudyCycleService } from './study_cycle.service';

describe('StudyCycleController', () => {
  let controller: StudyCycleController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StudyCycleController],
      providers: [StudyCycleService],
    }).compile();

    controller = module.get<StudyCycleController>(StudyCycleController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
