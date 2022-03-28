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
        .leftJoinAndSelect('photo.user', 'user')
        .select([
          'user.id',
          'user.username',
          'user.email',
          'photo.id',
          'photo.url',
        ])
        .getManyAndCount();

      return {
        statusCode: 200,
        message: 'Success',
        data: dataAll[0],
      };
    } catch (error) {
      throw new HttpException('Invalid  or ', HttpStatus.BAD_REQUEST);
    }
    return `This action returns all photo`;
  }

  async findOne(id: number) {
    try {
      const dataFindOne = await this.photoRepository
        .createQueryBuilder('photo')
        .leftJoinAndSelect('photo.user', 'user')
        .select([
          'user.id',
          'user.username',
          'user.email',
          'photo.id',
          'photo.url',
        ])
        .where('photo.id = :id', { id })
        .getOne();
      return {
        statusCode: 200,
        message: 'Success',
        data: dataFindOne,
      };
    } catch (error) {
      throw new HttpException('Invalid  or ', HttpStatus.BAD_REQUEST);
    }
  }

  update(id: number, updatePhotoDto: UpdatePhotoDto) {
    return `This action updates a #${id} photo`;
  }

  async remove(id: number) {
    try {
      await this.photoRepository.delete(id);
      return {
        statusCode: 200,
        message: 'Success remove',
      };
    } catch (error) {}
    return `This action removes a #${id} photo`;
  }
}
