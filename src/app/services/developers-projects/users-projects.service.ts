import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {UserProject} from "../../domain/user-project";
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class UsersProjectsService {
    constructor(private http: HttpClient) { }

    // Get requests
    getByIdDeveloper(idDeveloper: number): Observable<UserProject[]> {
        return this.http.get<UserProject[]>(`${environment.apiUrl}/userProject/byIdDeveloper/${idDeveloper}`);
    }

    getByIdDeveloperIsAppliance(idDeveloper: number) : Observable<UserProject[]> {
        return this.http.get<UserProject[]>(`${environment.apiUrl}/userProject/byIdDeveloperIsAppliance/${idDeveloper}`);
    }

    getByIdDeveloperIdProject(idDeveloper: number, idProject: number) : Observable<UserProject> {
        return this.http.get<UserProject>(`${environment.apiUrl}/userProject/byIdDeveloperIdProject/${idDeveloper},${idProject}`);
    }

    getDevelopersByIdProject(idProject: number | undefined): Observable<UserProject> {
        return this.http.get<UserProject>(`${environment.apiUrl}/userProject/developersByIdProject/${idProject}`);
    }

    getScrumMasterByIdProject(idProject: number | undefined): Observable<UserProject> {
        return this.http.get<UserProject>(`${environment.apiUrl}/userProject/scrumMasterByIdProject/${idProject}`);
    }

    // Post requests
    addDeveloperProject(developerProject : UserProject): Observable<UserProject> {
        const httpOptions = {
            headers: new HttpHeaders({'Content-Type': 'application/json'})
        }
        return this.http.post<UserProject>(`${environment.apiUrl}/userProject`, JSON.stringify(developerProject), httpOptions);
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
