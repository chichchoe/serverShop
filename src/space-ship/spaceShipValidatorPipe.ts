import {
  ArgumentMetadata,
  BadRequestException,
  PipeTransform,
} from '@nestjs/common';
import { CreateSpaceShipDto } from './dto/create-space-ship.dto';
import { SpaceShipRequestDto } from './dto/spaceShipRequest.dto';
import { spaceShipSchema } from './spaceShipSchema.joi';

export class SpaceShipValidatorPipe
  implements PipeTransform<SpaceShipRequestDto, CreateSpaceShipDto>
{
  public transform(
    query: SpaceShipRequestDto,
    _metadata: ArgumentMetadata,
  ): CreateSpaceShipDto {
    const result = spaceShipSchema.validate(query, { convert: true });
    if (result.error) {
      const errorMessages = result.error.details.map((d) => d.message).join();
      throw new BadRequestException(errorMessages);
    }

    const validSpaceShip = result.value;
    return {
      spaceShipId: validSpaceShip.id,
      onMission: validSpaceShip.onMission,
      shipName: validSpaceShip.name,
      captainId: validSpaceShip.captain.id,
      dateCreated: validSpaceShip.dateCreated,
    } as CreateSpaceShipDto;
  }
}
