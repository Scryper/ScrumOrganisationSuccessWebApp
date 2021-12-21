import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Technology} from "../../domain/technology";
import {environment} from "../../../environments/environment";

@Injectable({
    providedIn: 'root'
})
export class TechnologiesService {
    constructor(private http: HttpClient) { }

    // Get requests
    async getAll(): Promise<Technology[]> {
        return this.http.get<Technology[]>(`${environment.apiUrl}/technology`).toPromise();
    }

    async getById(id: number): Promise<Technology> {
        return this.http.get<Technology>(`${environment.apiUrl}/technology/byId/${id}`).toPromise();
    }
}
