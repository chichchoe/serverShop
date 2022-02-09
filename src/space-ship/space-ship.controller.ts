import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { SpaceShipService } from './space-ship.service';
import { CreateSpaceShipDto } from './dto/create-space-ship.dto';
import { UpdateSpaceShipDto } from './dto/update-space-ship.dto';
import { SpaceShipValidatorPipe } from './spaceShipValidatorPipe';

@Controller('space-ship')
export class SpaceShipController {
  constructor(private readonly spaceShipService: SpaceShipService) {}

  @Post()
  create(
    @Body(new SpaceShipValidatorPipe()) createSpaceShipDto: CreateSpaceShipDto,
  ) {
    console.log(createSpaceShipDto);
    return this.spaceShipService.create(createSpaceShipDto);
  }

  @Get()
  findAll() {
    return this.spaceShipService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: string) {
    return this.spaceShipService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateSpaceShipDto: UpdateSpaceShipDto,
  ) {
    return this.spaceShipService.update(+id, updateSpaceShipDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.spaceShipService.remove(+id);
  }
}
