import { Injectable } from '@angular/core';
import {UserService} from "../user.service";
import {SosUser} from "../../domain/SosUser";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class SignUpService {

    userData : SosUser;

    constructor(private userService : UserService) {
        this.userData=null as any;
    }

    verifyPasswords(psw1:string, psw2 : string){
        if(psw1==psw2) return true;
        else return false;
    }

    verifyEmail(email:string){
        return this.userService.findByEmail(email).subscribe(
            {
                complete:()=>{
                    console.log("ok");
                }
            },
        );
    }
}
