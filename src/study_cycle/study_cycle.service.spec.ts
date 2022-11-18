import { Test, TestingModule } from '@nestjs/testing';
import { StudyCycleService } from './study_cycle.service';

describe('StudyCycleService', () => {
  let service: StudyCycleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StudyCycleService],
    }).compile();

    service = module.get<StudyCycleService>(StudyCycleService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
