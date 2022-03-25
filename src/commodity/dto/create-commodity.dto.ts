import { ApiProperty } from '@nestjs/swagger';

export class CreateCommodityDto {
  @ApiProperty({
    type: String,
    example: 'T-shirt',
    description: 'The name of the commodity',
  })
  color?: string;
  @ApiProperty({
    type: String,
    example: 'T-shirt',
    description: 'The name of the commodity',
  })
  department?: string;
  @ApiProperty({
    type: String,
    description: 'The name of the commodity',
    example: 'T-shirt',
  })
  productName?: string;
  @ApiProperty({
    type: Number,
    description: 'The price of the commodity',
    example: 200,
  })
  price?: number;

  @ApiProperty({
    type: String,
    description: 'The price of the commodity',
    example: 'Incredible',
  })
  productAdjective?: string;

  @ApiProperty({
    type: String,
    description: 'The price of the commodity',
    example: 'Steel',
  })
  productMaterial?: string;

  @ApiProperty({
    type: String,
    description: 'The price of the commodity',
    example:
      'Andy shoes are designed to keeping in mind durability as well as trends, the most stylish range of shoes & sandals',
  })
  productDescription?: string;

  @ApiProperty({
    type: String,
    description: 'The price of the commodity',
    example: 'Sausages',
  })
  product?: string;
}
export class ListAllEntities {
  skip?: number;
  limit?: number;
  price?: 'ASC' | 'DESC';
  color?: 'ASC' | 'DESC';
  filterColor?: [{ color: string }];
}
