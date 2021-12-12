import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { SosUser } from "../domain/sos-user";
import { environment } from "../../environments/environment";

@Injectable({
    providedIn: 'root'
})
export class UserService {
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<SosUser[]>(`${environment.apiUrl}/users`);
    }

    getByEmail(email:string){
        return this.http.get<SosUser>(`${environment.apiUrl}/users/byEmail/${email}`);
    }

    getById(id:number){
        return this.http.get<SosUser>(`${environment.apiUrl}/users/byId/${id}`);
    }

    addUser(){

    }
}
