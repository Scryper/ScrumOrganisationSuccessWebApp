import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Project } from "../../domain/project";
import { environment } from "../../../environments/environment";

@Injectable({
    providedIn: 'root'
})
export class ProjectsService {
    constructor(private http: HttpClient) { }

    // Get requests
    getAll(): Observable<Project[]> {
        return this.http.get<Project[]>(`${environment.apiUrl}/projects`);
    }

    getByIdProductOwner(idProductOwner: number): Observable<Project[]> {
        return this.http.get<Project[]>(`${environment.apiUrl}/projects/byProductOwner/${idProductOwner}`);
    }

    getByIdScrumMaster(idScrumMaster: number): Observable<Project[]> {
        return this.http.get<Project[]>(`${environment.apiUrl}/projects/byScrumMaster/${idScrumMaster}`);
    }

    getById(id: number): Observable<Project> {
        return this.http.get<Project>(`${environment.apiUrl}/projects/byId/${id}`);
    }

    // Post requests
    addProject(project: Project): Observable<Project> {
        return this.http.post<Project>(`${environment.apiUrl}/projects`, project);
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
