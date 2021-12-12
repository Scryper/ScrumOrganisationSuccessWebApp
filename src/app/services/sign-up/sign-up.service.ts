import { Injectable } from '@angular/core';
import {UserService} from "../users/user.service";
import {SosUser} from "../../domain/sos-user";

@Injectable({
  providedIn: 'root'
})
export class SignUpService {

    userData : SosUser;

    constructor(private userService : UserService) {
        this.userData=null as any;
    }

    verifyPasswords(psw1:string, psw2 : string){
        return psw1 == psw2;
    }

    verifyEmail(email:string){
        return this.userService.getByEmail(email).subscribe(
            {
                complete:()=>{
                    console.log("ok");
                }
            },
        );
    }
}
