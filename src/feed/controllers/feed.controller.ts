import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Request,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { FeedService } from '../services/feed.service';
import { UpdateFeedDto } from '../dto/update-feed.dto';
import { JwtGuard } from '../../auth/guards/jwt.guard';
import { Observable } from 'rxjs';
import { FeedPost } from '../models/post.interface';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Feed')
@Controller('feed')
export class FeedController {
  constructor(private readonly feedService: FeedService) {}

  @UseGuards(JwtGuard)
  @Post()
  create(@Body() feedPost: FeedPost, @Request() req): Observable<FeedPost> {
    return this.feedService.createPost(req.user, feedPost);
  }

  @Get()
  findAll(): Promise<FeedPost[]> {
    return this.feedService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<FeedPost> {
    return this.feedService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFeedDto: UpdateFeedDto) {
    return this.feedService.update(+id, updateFeedDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.feedService.remove(+id);
  }
}
