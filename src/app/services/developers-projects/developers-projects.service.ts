import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {DeveloperProject} from "../../domain/developer-project";
import {environment} from "../../../environments/environment";
import {SosUser} from "../../domain/sos-user";

@Injectable({
    providedIn: 'root'
})
export class DevelopersProjectsService {
    constructor(private http: HttpClient) { }

    // Get requests
    getByIdDeveloper(idDeveloper: number): Promise<DeveloperProject[]> {
        return this.http.get<DeveloperProject[]>(`${environment.apiUrl}/developerProject/byIdDeveloper/${idDeveloper}`).toPromise();
    }

    getByIdDeveloperIsAppliance(idDeveloper : number) : Promise<DeveloperProject[]>{
        return this.http.get<DeveloperProject[]>(`${environment.apiUrl}/developerProject/byIdDeveloperIsAppliance/${idDeveloper}`).toPromise();
    }

    getByIdDeveloperIdProject(idDeveloper:number,idProject:number) : Promise<DeveloperProject>{
        return this.http.get<DeveloperProject>(`${environment.apiUrl}/developerProject/byIdDeveloperIdProject/${idDeveloper},${idProject}`).toPromise();
    }

    // Post requests
    addDeveloperProject(developerProject : DeveloperProject) {
        const httpOptions = {
            headers: new HttpHeaders({'Content-Type': 'application/json'})
        }
        return this.http.post<DeveloperProject>(`${environment.apiUrl}/developerProject`, JSON.stringify(developerProject), httpOptions).toPromise();
    }

    // Put requests

    // Delete requests
}
