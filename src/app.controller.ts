import { Controller, Get, HttpException, HttpStatus, Post, Req, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AppService } from './app.service';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { Entity } from './dto/file.dto';
import { CsvParser } from 'nest-csv-parser';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IEntity } from './interface/file.interface';
import { storage} from './filerestriction';
const fs = require('fs')
@Controller('csv')
export class AppController {
  [x: string]: any;
  constructor(
    @InjectModel('filecvs') private readonly filemodel:Model<IEntity>,
    private readonly csvParser: CsvParser,
    private readonly appService: AppService) {}

  
  @UseGuards(JwtAuthGuard)
  @Post('upload')
  @UseInterceptors(FileInterceptor('file',  { storage }),
    )
  async  uploadFile(@UploadedFile() file) {
             console.log(file.originalname)
            const stream = fs.createReadStream(__dirname + `/files/${file.originalname}`)// filename yaha object ky form ma araha h 
      const entities: any = await this.csvParser.parse(stream, Entity ,null,2,{ strict: true, separator: ',' });
            var data = entities.list;
            if(!data){
              throw new HttpException('now data found', HttpStatus.NOT_FOUND)
            }
           return  this.filemodel.insertMany(data) 
    }

  @UseGuards(JwtAuthGuard)
  @Get('csvdata')
  getdata(@Req() request) {
    console.log(request.user);
    return this.appService.csvdata()
  }


}
