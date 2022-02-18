import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Entity } from './dto/file.dto';
import { IEntity } from './interface/file.interface';

@Injectable()
export class AppService {
  constructor(
    @InjectModel('filecvs') private readonly filemodel:Model<IEntity>,
  ) {}
 
   async csvdata(): Promise<Entity[]> {
      const csv = await this.filemodel.find().exec()
      if(!csv || !csv[0]){
         throw new HttpException('now data found', HttpStatus.NOT_FOUND)
      }
      return csv;
   }
}