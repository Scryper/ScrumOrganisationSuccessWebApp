import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import { Project } from "../../domain/project";
import { environment } from "../../../environments/environment";

@Injectable({
    providedIn: 'root'
})
export class ProjectsService {
    constructor(private http: HttpClient) { }

    // Get requests
    getAll(): Promise<Project[]> {
        return this.http.get<Project[]>(`${environment.apiUrl}/projects`).toPromise();
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
    updateRepositoryUrl(id: number, repositoryUrl: string): Promise<boolean> {
        return this.http.put<boolean>(`${environment.apiUrl}/projects/${id}`, repositoryUrl).toPromise();
    }

    // Delete requests
    deleteProject(id: number): Promise<boolean> {
        return this.http.delete<boolean>(`${environment.apiUrl}/projects/${id}`).toPromise();
    }

    updateStatus(project: Project) {
        const httpOptions = {
            headers: new HttpHeaders({'Content-Type': 'application/json'})
        }
        return this.http.put<Project>(`${environment.apiUrl}/projects/updateStatus/${project.id}`, JSON.stringify(project), httpOptions).toPromise();
    }
}
