import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
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
}
