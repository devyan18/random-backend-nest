import { Test, TestingModule } from '@nestjs/testing';
import { AssistsController } from './assists.controller';
import { AssistsService } from './assists.service';

describe('AssistsController', () => {
  let controller: AssistsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AssistsController],
      providers: [AssistsService],
    }).compile();

    controller = module.get<AssistsController>(AssistsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
