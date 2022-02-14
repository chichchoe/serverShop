import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from, Observable } from 'rxjs';
import { User } from 'src/auth/models/user.interface';
import { Repository } from 'typeorm';
import { CreateFeedDto } from '../dto/create-feed.dto';
import { UpdateFeedDto } from '../dto/update-feed.dto';
import { FeedPostEntity } from '../entities/feed.entity';
import { FeedPost } from '../models/post.interface';

@Injectable()
export class FeedService {
  constructor(
    @InjectRepository(FeedPostEntity)
    private readonly feedRepository: Repository<FeedPostEntity>,
  ) {}
  createPost(user: User, feedPost: FeedPost): Observable<FeedPost> {
    feedPost.author = user;
    return from(this.feedRepository.save(feedPost));
  }

  findAll(): Promise<FeedPost[]> {
    return this.feedRepository.find();
  }

  async findOne(id: number): Promise<FeedPost> {
    try {
      const findId = await this.feedRepository.findOne(id);
      if (findId && findId.id) {
        return findId;
      }
      throw new HttpException(
        'A user has already been created with this email address',
        HttpStatus.BAD_REQUEST,
      );
    } catch (error) {
      throw new HttpException(
        { status: HttpStatus.INTERNAL_SERVER_ERROR, error: error },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  update(id: number, updateFeedDto: UpdateFeedDto) {
    return `This action updates a #${id} feed`;
  }

  remove(id: number) {
    return `This action removes a #${id} feed`;
  }
}
