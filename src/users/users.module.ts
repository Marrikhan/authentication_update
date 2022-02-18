import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { userSchema } from './schemas/user.schemas';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [MongooseModule.forFeature([{name:'user',schema:userSchema}]),
  AuthModule        
],
  providers: [UsersService],
  controllers: [UsersController]
})
export class UsersModule {
}
