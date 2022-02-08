import { Test, TestingModule } from '@nestjs/testing';
import { SpaceShipController } from './space-ship.controller';
import { SpaceShipService } from './space-ship.service';

describe('SpaceShipController', () => {
  let controller: SpaceShipController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SpaceShipController],
      providers: [SpaceShipService],
    }).compile();

    controller = module.get<SpaceShipController>(SpaceShipController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
