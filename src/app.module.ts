import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SpaceShipModule } from './space-ship/space-ship.module';
import configuration from './config/configuration';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SpaceShip } from './space-ship/entities/space-ship.entity';
import { FeedModule } from './feed/feed.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: parseInt(<string>process.env.POSTGRES_PORT),
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DB_NAME,
      // entities: [SpaceShip],
      autoLoadEntities: true,
      synchronize: true, // shouldn't be used in production - may lose data
      keepConnectionAlive: true,
    }),
    SpaceShipModule,
    AuthModule,
    FeedModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
