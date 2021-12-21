import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import { SosUser } from "../../domain/sos-user";
import { environment } from "../../../environments/environment";

@Injectable({
    providedIn: 'root'
})
export class UserService {
    constructor(private http: HttpClient) { }

    // Get requests
    async getAll() {
        return this.http.get<SosUser[]>(`${environment.apiUrl}/users`);
    }

    async getByEmail(email:string): Promise<SosUser> {
        return this.http.get<SosUser>(`${environment.apiUrl}/users/byEmail/${email}`).toPromise();
    }

    async getById(id:number): Promise<SosUser> {
        return this.http.get<SosUser>(`${environment.apiUrl}/users/byId/${id}`).toPromise();
    }

    async getByIdProject(idProject: number): Promise<SosUser[]> {
        return this.http.get<SosUser[]>(`${environment.apiUrl}/users/byProject/${idProject}`).toPromise();
    }

    // Post requests
    async addUser(user: SosUser) {
        const httpOptions = {
            headers: new HttpHeaders({'Content-Type': 'application/json'})
        }
        return this.http.post<SosUser>(`${environment.apiUrl}/users`, JSON.stringify(user), httpOptions).toPromise();
    }

    // Put request
    async updateFirstNameLastName(user: SosUser) {
        const httpOptions = {
            headers: new HttpHeaders({'Content-Type': 'application/json'})
        }
        return this.http.put<SosUser>(`${environment.apiUrl}/users/firstNameLastNameUpdate/${user.id}`, JSON.stringify(user), httpOptions).toPromise();
    }
}
