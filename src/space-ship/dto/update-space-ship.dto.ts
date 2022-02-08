import { PartialType } from '@nestjs/mapped-types';
import { CreateSpaceShipDto } from './create-space-ship.dto';

export class UpdateSpaceShipDto extends PartialType(CreateSpaceShipDto) {}
