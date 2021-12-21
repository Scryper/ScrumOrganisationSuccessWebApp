import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import { Project } from "../../domain/project";
import { environment } from "../../../environments/environment";
import {Observable} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class ProjectsService {
    constructor(private http: HttpClient) { }

    // Get requests
    getAll(): Observable<Project[]> {
        return this.http.get<Project[]>(`${environment.apiUrl}/projects`);
    }

    getById(id: number): Observable<Project> {
        return this.http.get<Project>(`${environment.apiUrl}/projects/byId/${id}`);
    }

    getByProjectName(projectName: string | null): Observable<Project> {
        return this.http.get<Project>(`${environment.apiUrl}/projects/byName/${projectName}`);
    }

    // Post requests
    addProject(project: Project): Observable<Project> {
        const httpOptions = {headers: new HttpHeaders({'Content-Type': 'application/json'})}
        return this.http.post<Project>(`${environment.apiUrl}/projects`, JSON.stringify(project),httpOptions);
    }

    // Put  requests
    updateRepositoryUrl(id: number, repositoryUrl: string): Observable<boolean> {
        return this.http.put<boolean>(`${environment.apiUrl}/projects/${id}`, repositoryUrl);
    }

    // Delete requests
    deleteProject(id: number): Observable<boolean> {
        return this.http.delete<boolean>(`${environment.apiUrl}/projects/${id}`);
    }

    updateStatus(project: Project) {
        const httpOptions = {
            headers: new HttpHeaders({'Content-Type': 'application/json'})
        }
        return this.http.put<Project>(`${environment.apiUrl}/projects/updateStatus/${project.id}`, JSON.stringify(project), httpOptions);
    }
}
