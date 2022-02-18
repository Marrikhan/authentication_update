import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { from, Observable } from 'rxjs';
import { users } from 'src/users/interface/user.interface';
const bcrypt =  require('bcrypt');

@Injectable()
export class AuthService { 
              constructor(private readonly jwtService: JwtService){}

              generateJwt(user:users):Observable<string> {
                  return from(this.jwtService.signAsync({user}));
              }

               //password bcrypt
               hashPassword(password: string): Observable<string> {
                return from<string>(bcrypt.hash(password,12))
        }
        //pasword change 
        comparePassword(password:string, storepassword: string): Observable<any> {
          return from(bcrypt.compare(password,storepassword));

        }

}
