import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty({ required: false })
  title: string;

  @ApiProperty({ required: false })
  price: number;

  @ApiProperty({ required: false })
  image: string;
}
