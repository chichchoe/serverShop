import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSpaceShipDto } from './dto/create-space-ship.dto';
import { UpdateSpaceShipDto } from './dto/update-space-ship.dto';
import { SpaceShip } from './entities/space-ship.entity';

@Injectable()
export class SpaceShipService {
  constructor(
    @InjectRepository(SpaceShip)
    private spaceShipRepository: Repository<SpaceShip>,
  ) {}
  create(createSpaceShipDto: CreateSpaceShipDto) {
    return createSpaceShipDto;
  }

  findAll() {
    return this.spaceShipRepository.find();
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
