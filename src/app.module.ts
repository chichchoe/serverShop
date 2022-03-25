import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import configuration from './config/configuration';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommodityModule } from './commodity/commodity.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { PhotoModule } from './photo/photo.module';

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
      // url: process.env.DATABASE_URL,
      autoLoadEntities: true,
      synchronize: true, // shouldn't be used in production - may lose data
      keepConnectionAlive: true,
    }),
    CommodityModule,
    UserModule,
    AuthModule,
    PhotoModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
