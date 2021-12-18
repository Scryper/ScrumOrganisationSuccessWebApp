import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {DeveloperTechnology} from "../../domain/developer-technology";
import {environment} from "../../../environments/environment";

@Injectable({
    providedIn: 'root'
})
export class DevelopersTechnologiesService {
    constructor(private http: HttpClient) { }

    // Get requests
    getByDeveloperId(id: number): Promise<DeveloperTechnology[]> {
        return this.http.get<DeveloperTechnology[]>(`${environment.apiUrl}/userTechnologies/byUser/${id}`).toPromise();
    }

    // Post requests
    addDeveloperTechnology(developerTechnology: DeveloperTechnology): Promise<DeveloperTechnology> {
        const httpOptions = {
            headers: new HttpHeaders({'Content-Type': 'application/json'})
        }
        return this.http.post<DeveloperTechnology>(`${environment.apiUrl}/userTechnologies`, JSON.stringify(developerTechnology), httpOptions).toPromise();
    }
}
