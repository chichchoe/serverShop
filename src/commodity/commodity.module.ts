import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommodityController } from './controllers/commodity.controller';
import { CommodityEntity } from './entities/commodity.entity';
import { CommodityService } from './services/commodity.service';

@Module({
  imports: [TypeOrmModule.forFeature([CommodityEntity])],
  controllers: [CommodityController],
  providers: [CommodityService],
})
export class CommodityModule {}
