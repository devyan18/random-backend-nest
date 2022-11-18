import { Test, TestingModule } from '@nestjs/testing';
import { AssistsService } from './assists.service';

describe('AssistsService', () => {
  let service: AssistsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AssistsService],
    }).compile();

    service = module.get<AssistsService>(AssistsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
