import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePhotoDto } from './dto/create-photo.dto';
import { UpdatePhotoDto } from './dto/update-photo.dto';
import { Photo } from './entities/photo.entity';

@Injectable()
export class PhotoService {
  constructor(
    @InjectRepository(Photo)
    private readonly photoRepository: Repository<Photo>,
  ) {}
  async create(createPhotoDto: CreatePhotoDto) {
    try {
      const data = await this.photoRepository.save(createPhotoDto);
      return {
        statusCode: 201,
        message: 'Create success',
        data: data,
      };
    } catch (error) {
      throw new HttpException(
        'Invalid username or password',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async findAll() {
    try {
      const dataAll = await this.photoRepository
        .createQueryBuilder('photo')
        // .leftJoinAndSelect('photo.users', 'user')
        .getManyAndCount();

      return {
        statusCode: 200,
        message: 'Success',
        data: dataAll,
      };
    } catch (error) {
      throw new HttpException('Invalid  or ', HttpStatus.BAD_REQUEST);
    }
    return `This action returns all photo`;
  }

  findOne(id: number) {
    return `This action returns a #${id} photo`;
  }

  update(id: number, updatePhotoDto: UpdatePhotoDto) {
    return `This action updates a #${id} photo`;
  }

  remove(id: number) {
    return `This action removes a #${id} photo`;
  }
}
