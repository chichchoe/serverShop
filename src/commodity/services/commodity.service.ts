import { Injectable } from '@nestjs/common';
import {
  CreateCommodityDto,
  ListAllEntities,
} from '../dto/create-commodity.dto';
import { UpdateCommodityDto } from '../dto/update-commodity.dto';
import { Repository } from 'typeorm';
import { CommodityEntity } from '../entities/commodity.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CommodityService {
  constructor(
    @InjectRepository(CommodityEntity)
    private readonly commodityRepository: Repository<CommodityEntity>,
  ) {}

  async create(createCommodityDto: CreateCommodityDto) {
    const commodity = await this.commodityRepository.save(createCommodityDto);

    return {
      statusCode: 201,
      message: 'Create success',
      data: commodity,
    };
  }

  async findAll(query: ListAllEntities) {
    const { skip, limit, price, color, filterColor } = query;
    const filter = filterColor ? [...filterColor] : [];
    const data = await this.commodityRepository.findAndCount({
      skip: skip,
      take: limit,
      cache: true,
      where: [...filter],
      order: {
        color: color,
        price: price,
      },
    });
    const findColor = await this.commodityRepository
      .createQueryBuilder('commodity')
      .select('color')
      .distinct()
      .getRawMany();
    return {
      total: data[1],
      color: findColor,
      data: data[0],
    };
  }

  async findOne(id: number) {
    const findId = await this.commodityRepository.findOne(id);

    if (!findId) {
      return {
        status: 'Fail',
        message: 'Not found id',
      };
    }
    return {
      status: 'success',
      data: findId,
    };
  }

  async update(id: number, updateCommodityDto: UpdateCommodityDto) {
    const dataUpdate = await this.commodityRepository.update(
      id,
      updateCommodityDto,
    );
    if (!dataUpdate) {
      return {
        status: 'Fail',
        message: 'Not found id',
      };
    }
    return {
      status: 'success',
      data: dataUpdate,
    };
  }

  async remove(id: number) {
    const deleteId = await this.commodityRepository.delete(id);
    if (deleteId.affected === 1) {
      return {
        status: 'success',
        message: 'Delete success',
      };
    }
    return { message: 'Not found id' };
  }
}
