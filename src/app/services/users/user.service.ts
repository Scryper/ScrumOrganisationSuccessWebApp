import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import { SosUser } from "../../domain/sos-user";
import { environment } from "../../../environments/environment";

@Injectable({
    providedIn: 'root'
})
export class UserService {
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<SosUser[]>(`${environment.apiUrl}/users`);
    }

    async getByEmail(email:string): Promise<SosUser> {
        return this.http.get<SosUser>(`${environment.apiUrl}/users/byEmail/${email}`).toPromise();
    }

    getById(id:number){
        return this.http.get<SosUser>(`${environment.apiUrl}/users/byId/${id}`);
    }

    async addUser(user: SosUser) {
        const httpOptions = {
            headers: new HttpHeaders({'Content-Type': 'application/json'})
        }
        return this.http.post<SosUser>(`${environment.apiUrl}/users`, JSON.stringify(user), httpOptions).toPromise();
    }
}
