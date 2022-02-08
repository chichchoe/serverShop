import { Injectable } from '@nestjs/common';
import { CreateSpaceShipDto } from './dto/create-space-ship.dto';
import { UpdateSpaceShipDto } from './dto/update-space-ship.dto';

@Injectable()
export class SpaceShipService {
  create(createSpaceShipDto: CreateSpaceShipDto) {
    return createSpaceShipDto;
  }

  findAll() {
    return `This action returns all spaceShip`;
  }

  findOne(id: number) {
    return `This action returns a #${id} spaceShip`;
  }

  update(id: number, updateSpaceShipDto: UpdateSpaceShipDto) {
    return `This action updates a #${id} spaceShip`;
  }

  remove(id: number) {
    return `This action removes a #${id} spaceShip`;
  }
}
