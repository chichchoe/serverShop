import { Module } from '@nestjs/common';
import { SpaceShipService } from './space-ship.service';
import { SpaceShipController } from './space-ship.controller';

@Module({
  controllers: [SpaceShipController],
  providers: [SpaceShipService],
})
export class SpaceShipModule {}
