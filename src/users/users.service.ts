import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user.dto';
import { users } from './interface/user.interface';
import { from, map, Observable, switchMap } from 'rxjs';
import { AuthService } from 'src/auth/services/auth/auth.service';
import { loginUserDto } from './loginUser.dto';
@Injectable()
export class UsersService {
    constructor(@InjectModel('user') private readonly useremodel:Model<users>,
                private authService: AuthService
    ){}  
//post data 
public async postuser(newuser:User) {
    
    return this.mailExists(newuser.email).pipe(
        switchMap((exists:boolean)=>{
            if(!exists) {
                return this.authService.hashPassword(newuser.password).pipe(
                    switchMap((passwordHash:string)=>{
                       newuser.password = passwordHash;
                        const user = new this.useremodel(newuser)
                    //    return user.save()
                    return from(user.save()).pipe(
                        map((saveuser: users)=>{
                            const {password, ...newuser} =  saveuser
                            return newuser
                        })
                    ) 
                    })
                )

            } else {
                throw new HttpException('Email already exist',HttpStatus.CONFLICT)
            }
        })
    )
    // const user = await new this.useremodel(newuser);
    // return user.save(); 
  }

  public login(loginUserDto:loginUserDto): Observable<string> {
          return this.findUserByEmail(loginUserDto.email ).pipe(
              switchMap((User:users)=>{
                  if(User){
                      console.log(User);
                 return     this.validatePassword(loginUserDto.password,User.password).pipe(
                        switchMap((passwordsmatch: boolean)=>{
                            if(passwordsmatch) {
                                  return this.findOne(User.id).pipe(
                                      switchMap((User:users)=>this.authService.generateJwt(User))
                                  )
                            }else {
                              throw new HttpException('login was not successfull',HttpStatus.UNAUTHORIZED)
                            }
                        })
                    )
                  } else {
                      throw new HttpException('User not Found', HttpStatus.NOT_FOUND );
                  }
                  
                })
          )
  }


findOne(id:number): Observable<users> {
  return from(this.useremodel.findOne({id}));
}

private findUserByEmail(email:string): Observable<users> {
    return   from (this.useremodel.findOne({email}));   
}

private validatePassword(password:string,storepassword:string): Observable<boolean> {
    return  this.authService.comparePassword(password,storepassword);
}

private mailExists(email: string):Observable<boolean> {
    return from(this.useremodel.findOne({email})).pipe(
        map((user:User) =>{
            if(user){
                return true;
            }else {
                return false
            }
        })
    )
}

}
