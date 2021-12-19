import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
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

    getDevelopersByIdProject(idProject: number | undefined){
        return this.http.get<DeveloperProject>(`${environment.apiUrl}/developerProject/developersByIdProject/${idProject}`).toPromise();

    }

    getScrumMasterByIdProject(idProject: number | undefined){
        return this.http.get<DeveloperProject>(`${environment.apiUrl}/developerProject/scrumMasterByIdProject/${idProject}`).toPromise();

    }

    // Put requests

    // Delete requests
}
