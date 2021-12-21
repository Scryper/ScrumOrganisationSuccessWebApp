import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {DeveloperTechnology} from "../../domain/developer-technology";
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class DevelopersTechnologiesService {
    constructor(private http: HttpClient) { }

    // Get all requests
    getAll(): Observable<DeveloperTechnology[]> {
        return this.http.get<DeveloperTechnology[]>(`${environment.apiUrl}/userTechnologies`);
    }

    // Get requests
    getByDeveloperId(id: number): Observable<DeveloperTechnology[]> {
        return this.http.get<DeveloperTechnology[]>(`${environment.apiUrl}/userTechnologies/byUser/${id}`);
    }

    // Post requests
    addDeveloperTechnology(developerTechnology: DeveloperTechnology): Observable<DeveloperTechnology> {
        const httpOptions = {
            headers: new HttpHeaders({'Content-Type': 'application/json'})
        }
        return this.http.post<DeveloperTechnology>(`${environment.apiUrl}/userTechnologies`, JSON.stringify(developerTechnology), httpOptions);
    }

    // Delete requests
    deleteDeveloperTechnology(idDeveloper: number, idTechnology: number): Observable<DeveloperTechnology> {
        return this.http.delete<DeveloperTechnology>(`${environment.apiUrl}/userTechnologies/${idDeveloper},${idTechnology}`);
    }
}
