import { Module } from '@nestjs/common';
import { SpaceShipService } from './space-ship.service';
import { SpaceShipController } from './space-ship.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SpaceShip } from './entities/space-ship.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SpaceShip])],
  controllers: [SpaceShipController],
  providers: [SpaceShipService],
})
export class SpaceShipModule {}
