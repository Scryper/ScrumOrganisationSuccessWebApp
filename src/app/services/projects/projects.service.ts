import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import { Observable } from "rxjs";
import { Project } from "../../domain/project";
import { environment } from "../../../environments/environment";
import {DeveloperProject} from "../../domain/developer-project";
import {SosUser} from "../../domain/sos-user";

@Injectable({
    providedIn: 'root'
})
export class ProjectsService {
    constructor(private http: HttpClient) { }

    // Get requests
    getAll(): Promise<Project[]> {
        return this.http.get<Project[]>(`${environment.apiUrl}/projects`).toPromise();
    }

    getByIdProductOwner(idProductOwner: number): Observable<Project[]> {
        return this.http.get<Project[]>(`${environment.apiUrl}/projects/byProductOwner/${idProductOwner}`);
    }

    getByIdScrumMaster(idScrumMaster: number): Observable<Project[]> {
        return this.http.get<Project[]>(`${environment.apiUrl}/projects/byScrumMaster/${idScrumMaster}`);
    }

    getById(id: number): Promise<Project> {
        return this.http.get<Project>(`${environment.apiUrl}/projects/byId/${id}`).toPromise();
    }

    getByProjectName(projectName: string | null): Promise<Project> {
        return this.http.get<Project>(`${environment.apiUrl}/projects/byName/${projectName}`).toPromise();
    }

    // Post requests
    addProject(project: Project){
        const httpOptions = {headers: new HttpHeaders({'Content-Type': 'application/json'})}
        return this.http.post<Project>(`${environment.apiUrl}/projects`, JSON.stringify(project),httpOptions).toPromise();
    }



    // Put  requests
    updateRepositoryUrl(id: number, repositoryUrl: string): Observable<boolean> {
        return this.http.put<boolean>(`${environment.apiUrl}/projects/${id}`, repositoryUrl);
    }

    // Delete requests
    deleteProject(id: number): Observable<boolean> {
        return this.http.delete<boolean>(`${environment.apiUrl}/projects/${id}`);
    }
}
