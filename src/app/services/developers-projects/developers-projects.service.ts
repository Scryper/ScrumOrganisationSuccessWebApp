import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {DeveloperProject} from "../../domain/developer-project";
import {environment} from "../../../environments/environment";

@Injectable({
    providedIn: 'root'
})
export class DevelopersProjectsService {
    constructor(private http: HttpClient) { }

    // Get requests
    getByIdDeveloper(idDeveloper: number): Promise<DeveloperProject[]> {
        return this.http.get<DeveloperProject[]>(`${environment.apiUrl}/developerProject/byIdDeveloper/${idDeveloper}`).toPromise();
    }

    // Post requests

    // Put requests

    // Delete requests
}