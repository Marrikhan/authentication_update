import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import {MongooseModule}    from '@nestjs/mongoose';
import { CsvModule } from 'nest-csv-parser';
import { fileschema } from './schema/file.schema';
import {ConfigModule, ConfigService} from '@nestjs/config'
import { MulterModule } from '@nestjs/platform-express';



@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true,}),UsersModule,MongooseModule.forRoot(`mongodb://localhost:27017/${process.env.MONGODB_DB_URI}`),AuthModule,CsvModule,MongooseModule.forFeature([{name:'filecvs',schema:fileschema}])],
  controllers: [AppController],
  providers: [AppService,ConfigService],
})


export class AppModule {}
