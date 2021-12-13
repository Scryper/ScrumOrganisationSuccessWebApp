import { Injectable } from '@angular/core';
import {UserService} from "../users/user.service";
import {SosUser} from "../../domain/sos-user";

@Injectable({
  providedIn: 'root'
})
export class SignUpService {
    userData : SosUser;

    constructor(private userService : UserService) {
        this.userData = null as any;
    }

    verifyPasswords(password: string, passwordConfirmation: string){
        return password == passwordConfirmation;
    }
}
