import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UserEntity } from '../entities/user.entity';
import * as bcrypt from 'bcrypt';

const saltOrRounds = 10;

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}
  async create(createUserDto: CreateUserDto) {
    const { username, password } = createUserDto;
    const findeUsername = await this.userRepository.findOne({ username });
    if (findeUsername) {
      return {
        status: 'error',
        message: 'Username have been used',
      };
    }
    const hash = await bcrypt.hash(password, saltOrRounds);
    createUserDto.password = hash;
    const createUser = await this.userRepository.save(createUserDto);
    return {
      statusCode: 201,
      message: 'Create success',
      data: createUser,
    };
  }

  async findOne(id: number) {
    // const findUserId = await this.userRepository.findOne({
    //   id,
    // });
    const findUserId = await this.userRepository
      .createQueryBuilder('user_info')
      .where('user_info.id = :id', { id })
      .leftJoinAndSelect('user_info.photos', 'photo')
      .getMany();
    // delete findUserId.password;
    // delete findUserId.refresh_token;
    // delete findUserId.expiresIn;
    if (findUserId) {
      return {
        statusCode: 200,
        message: 'Create success',
        data: findUserId,
      };
    }
    return {
      status: 'error',
      message: 'No found id',
    };
  }

  async findUser(username: string) {
    const findUserId = await this.userRepository.findOne({ username });

    if (findUserId) {
      delete findUserId.password;
      return findUserId;
    }
    return null;
  }

  async login(username: string, password: string) {
    const findUser = await this.userRepository.findOne({ username });
    if (findUser) {
      const hash = await bcrypt.compare(password, findUser.password);
      if (hash) {
        delete findUser.password;
        delete findUser.refresh_token;
        delete findUser.expiresIn;
        return findUser;
      }
      return null;
    }
    return null;
  }

  async saveOrUpdateRefreshToken(
    refreshToken: string,
    id: string,
    refreshTokenExpires,
  ) {
    await this.userRepository.update(+id, {
      refresh_token: refreshToken,
      expiresIn: refreshTokenExpires,
    });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
