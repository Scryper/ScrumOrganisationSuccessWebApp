import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import { SosUser } from "../domain/SosUser";
import { environment } from "../../environments/environment";

@Injectable({
    providedIn: 'root'
})

export class UserService {
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<SosUser[]>(`${environment.apiUrl}/users`);
    }

    findByEmail(email:string){
        return this.http.get<SosUser>(`${environment.apiUrl}/users/byEmail/${email}`);
    }

    findById(id:number){
        return this.http.get<SosUser>(`${environment.apiUrl}/users/byId/${id}`);
    }

    addUser(){

    }
}
