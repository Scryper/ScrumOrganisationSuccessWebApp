import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import { SosUser } from "../../domain/sos-user";
import { environment } from "../../../environments/environment";
import {Observable} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class UserService {
    constructor(private http: HttpClient) { }

    // Get requests
    getAll(): Observable<SosUser[]> {
        return this.http.get<SosUser[]>(`${environment.apiUrl}/users`);
    }

    getByEmail(email:string): Observable<SosUser> {
        return this.http.get<SosUser>(`${environment.apiUrl}/users/byEmail/${email}`);
    }

    getById(id:number): Observable<SosUser> {
        return this.http.get<SosUser>(`${environment.apiUrl}/users/byId/${id}`);
    }

    getByIdProject(idProject: number): Observable<SosUser[]> {
        return this.http.get<SosUser[]>(`${environment.apiUrl}/users/byProject/${idProject}`);
    }

    getByIdProjectIsWorking(idProject: number): Observable<SosUser[]> {
        return this.http.get<SosUser[]>(`${environment.apiUrl}/users/byProjectIsWorking/${idProject}`);
    }

    // Post requests
    addUser(user: SosUser): Observable<SosUser> {
        const httpOptions = {
            headers: new HttpHeaders({'Content-Type': 'application/json'})
        }
        return this.http.post<SosUser>(`${environment.apiUrl}/users`, JSON.stringify(user), httpOptions);
    }

    // Put request
    updateFirstNameLastName(user: SosUser) {
        const httpOptions = {
            headers: new HttpHeaders({'Content-Type': 'application/json'})
        }
        return this.http.put<SosUser>(`${environment.apiUrl}/users/firstNameLastNameUpdate/${user.id}`, JSON.stringify(user), httpOptions);
    }
}
