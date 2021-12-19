import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {UserProject} from "../../domain/user-project";
import {environment} from "../../../environments/environment";

@Injectable({
    providedIn: 'root'
})
export class UsersProjectsService {
    constructor(private http: HttpClient) { }

    // Get requests
    getByIdDeveloper(idDeveloper: number): Promise<UserProject[]> {
        return this.http.get<UserProject[]>(`${environment.apiUrl}/developerProject/byIdDeveloper/${idDeveloper}`).toPromise();
    }

    getByIdDeveloperIsAppliance(idDeveloper : number) : Promise<UserProject[]>{
        return this.http.get<UserProject[]>(`${environment.apiUrl}/developerProject/byIdDeveloperIsAppliance/${idDeveloper}`).toPromise();
    }

    getByIdDeveloperIdProject(idDeveloper:number,idProject:number) : Promise<UserProject>{
        return this.http.get<UserProject>(`${environment.apiUrl}/developerProject/byIdDeveloperIdProject/${idDeveloper},${idProject}`).toPromise();
    }

    // Post requests
    addDeveloperProject(developerProject : UserProject) {
        const httpOptions = {
            headers: new HttpHeaders({'Content-Type': 'application/json'})
        }
        return this.http.post<UserProject>(`${environment.apiUrl}/developerProject`, JSON.stringify(developerProject), httpOptions).toPromise();
    }

    getDevelopersByIdProject(idProject: number | undefined){
        return this.http.get<UserProject>(`${environment.apiUrl}/developerProject/developersByIdProject/${idProject}`).toPromise();

    }

    getScrumMasterByIdProject(idProject: number | undefined){
        return this.http.get<UserProject>(`${environment.apiUrl}/developerProject/scrumMasterByIdProject/${idProject}`).toPromise();

    }

    // Put requests

    // Delete requests
}
