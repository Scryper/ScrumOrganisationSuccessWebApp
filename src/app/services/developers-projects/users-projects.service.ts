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
    async getByIdDeveloper(idDeveloper: number): Promise<UserProject[]> {
        return this.http.get<UserProject[]>(`${environment.apiUrl}/userProject/byIdDeveloper/${idDeveloper}`).toPromise();
    }

    async getByIdDeveloperIsAppliance(idDeveloper: number) : Promise<UserProject[]> {
        return this.http.get<UserProject[]>(`${environment.apiUrl}/userProject/byIdDeveloperIsAppliance/${idDeveloper}`).toPromise();
    }

    async getByIdDeveloperIdProject(idDeveloper: number, idProject: number) : Promise<UserProject> {
        return this.http.get<UserProject>(`${environment.apiUrl}/userProject/byIdDeveloperIdProject/${idDeveloper},${idProject}`).toPromise();
    }

    async getDevelopersByIdProject(idProject: number | undefined): Promise<UserProject> {
        return this.http.get<UserProject>(`${environment.apiUrl}/userProject/developersByIdProject/${idProject}`).toPromise();
    }

    async getScrumMasterByIdProject(idProject: number | undefined): Promise<UserProject> {
        return this.http.get<UserProject>(`${environment.apiUrl}/userProject/scrumMasterByIdProject/${idProject}`).toPromise();
    }

    // Post requests
    async addDeveloperProject(developerProject : UserProject) {
        const httpOptions = {
            headers: new HttpHeaders({'Content-Type': 'application/json'})
        }
        return this.http.post<UserProject>(`${environment.apiUrl}/userProject`, JSON.stringify(developerProject), httpOptions).toPromise();
    }

    // Put requests

    // Delete requests
    /*async deleteDeveloperProjectByidDeveloperByidProject(idDeveloper: number | undefined, idProject: number | undefined): Promise<UserProject> {
        console.log(idDeveloper,idProject);
        return this.http.delete<UserProject>(`${environment.apiUrl}/developerProject/${idDeveloper},${idProject}`).toPromise();
    }*/
}
