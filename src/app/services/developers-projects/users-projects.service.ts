import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {UserProject} from "../../domain/user-project";
import {environment} from "../../../environments/environment";
import {DeveloperTechnology} from "../../domain/developer-technology";
import {UserStory} from "../../domain/user-story";

@Injectable({
    providedIn: 'root'
})
export class UsersProjectsService {
    constructor(private http: HttpClient) { }

    // Get requests
    getByIdDeveloper(idDeveloper: number): Promise<UserProject[]> {
        return this.http.get<UserProject[]>(`${environment.apiUrl}/userProject/byIdDeveloper/${idDeveloper}`).toPromise();
    }

    getByIdDeveloperIsAppliance(idDeveloper : number) : Promise<UserProject[]>{
        return this.http.get<UserProject[]>(`${environment.apiUrl}/userProject/byIdDeveloperIsAppliance/${idDeveloper}`).toPromise();
    }

    getByIdDeveloperIdProject(idDeveloper:number,idProject:number) : Promise<UserProject>{
        return this.http.get<UserProject>(`${environment.apiUrl}/userProject/byIdDeveloperIdProject/${idDeveloper},${idProject}`).toPromise();
    }

    // Post requests
    addDeveloperProject(developerProject : UserProject) {
        const httpOptions = {
            headers: new HttpHeaders({'Content-Type': 'application/json'})
        }
        return this.http.post<UserProject>(`${environment.apiUrl}/userProject`, JSON.stringify(developerProject), httpOptions).toPromise();
    }

    getUsersByIdProject(idProject: number | undefined){
        return this.http.get<UserProject>(`${environment.apiUrl}/userProject/byIdProject/${idProject}`).toPromise();

    }

    getDevelopersByIdProject(idProject: number | undefined){
        return this.http.get<UserProject>(`${environment.apiUrl}/userProject/developersByIdProject/${idProject}`).toPromise();

    }

    getScrumMasterByIdProject(idProject: number | undefined){
        return this.http.get<UserProject>(`${environment.apiUrl}/userProject/scrumMasterByIdProject/${idProject}`).toPromise();

    }

    // Put requests
    updateDeveloperProjectIsAppliance(idDeveloper: number | undefined, idProject: number | undefined, userProject:UserProject) {
        const httpOptions = {
            headers: new HttpHeaders({'Content-Type': 'application/json'})
        }
        return this.http.put<UserProject>(`${environment.apiUrl}/userProject/${idDeveloper}, ${idProject}`, JSON.stringify(userProject), httpOptions).toPromise();
    }
    // Delete requests
    deleteDeveloperProjectByidDeveloperByidProject(idDeveloper: number | undefined, idProject: number | undefined): Promise<UserProject> {
        console.log(idProject)
        return this.http.delete<UserProject>(`${environment.apiUrl}/userProject/${idDeveloper}, ${idProject}`).toPromise();
    }
}
