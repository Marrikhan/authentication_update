import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.dto';
import { loginUserDto } from './loginUser.dto';
import { map, Observable } from 'rxjs';

@Controller('user')
export class UsersController {
         constructor(private userService:UsersService){}

         @Post()
         public userregister(@Body() user:User){
             return this.userService.postuser(user)
         }
 
         @Post('login')
         @HttpCode(200)
         public login(@Body() loginUserDto:loginUserDto){
             return this.userService.login(loginUserDto).pipe(
                 map((jwt: string)=>{
                     return {
                         acccess_token:jwt,
                         token_type: 'JWT',
                         expires_in: 10000
                     }
                 })
             );
         }
}
