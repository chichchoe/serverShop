import {
  ArgumentMetadata,
  BadRequestException,
  HttpException,
  PipeTransform,
} from '@nestjs/common';
import { CommodityModel } from '../models/commodity.model';
import { CommoditySchema } from './commoditySchema.joi';

export class CommodityValidator implements PipeTransform<CommodityModel> {
  public transform(
    query: CommodityModel,
    _metadata: ArgumentMetadata,
  ): CommodityModel {
    const result = CommoditySchema.validate(query, {
      convert: true,
    });
    if (result.error) {
      const errorMessages = result.error.details.map((d) => d.message).join();
      throw new HttpException(errorMessages, 200);
    }

    const validUser = result.value;
    return {
      color: validUser.color,
      department: validUser.department,
      productName: validUser.productName,
      price: validUser.price,
      productAdjective: validUser.productAdjective,
      productMaterial: validUser.productMaterial,
      productDescription: validUser.productDescription,
      product: validUser.product,
    };
  }
}
