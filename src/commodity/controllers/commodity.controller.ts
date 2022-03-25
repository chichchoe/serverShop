import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { ApiBody, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import {
  CreateCommodityDto,
  ListAllEntities,
} from '../dto/create-commodity.dto';
import { UpdateCommodityDto } from '../dto/update-commodity.dto';
import { CommodityValidator } from '../pipe/commodity.pipe';
import { CommodityService } from '../services/commodity.service';

@ApiTags('commodity')
@Controller('commodity')
export class CommodityController {
  constructor(private readonly commodityService: CommodityService) {}

  @Post()
  @ApiBody({
    type: CreateCommodityDto,
    required: true,
  })
  create(
    @Body(new CommodityValidator()) createCommodityDto: CreateCommodityDto,
  ) {
    return this.commodityService.create(createCommodityDto);
  }

  @Get()
  @ApiQuery({
    name: 'skip',
    required: true,
    type: Number,
  })
  @ApiQuery({
    name: 'limit',
    required: true,
    type: Number,
    description: 'Limit number of items have between 10 and 20',
  })
  findAll(@Query() query: ListAllEntities) {
    return this.commodityService.findAll(query);
  }

  @Get(':id')
  @ApiParam({
    name: 'id',
    required: true,
    type: Number,
  })
  findOne(@Param('id') id: number) {
    return this.commodityService.findOne(+id);
  }

  @Patch(':id')
  @ApiParam({
    name: 'id',
    required: true,
    type: Number,
  })
  update(
    @Param('id') id: number,
    @Body(new CommodityValidator()) updateCommodityDto: UpdateCommodityDto,
  ) {
    return this.commodityService.update(+id, updateCommodityDto);
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    required: true,
    type: Number,
  })
  remove(@Param('id') id: number) {
    return this.commodityService.remove(+id);
  }
}
