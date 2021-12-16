import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import {Observable} from "rxjs";
import { Sprint } from "../../domain/sprint";
import {environment} from "../../../environments/environment";

@Injectable({
    providedIn: 'root'
})
export class SprintsService {
    constructor(private http: HttpClient) { }

    // Get requests
    getAll(): Observable<Sprint[]> {
        return this.http.get<Sprint[]>(`${environment.apiUrl}/sprints`);
    }

    async getByIdProject(idProject: number): Promise<Sprint[]> {
        return this.http.get<Sprint[]>(`${environment.apiUrl}/sprints/byProject/${idProject}`).toPromise();
    }

    getById(id: number): Observable<Sprint> {
        return this.http.get<Sprint>(`${environment.apiUrl}/sprints/byId/${id}`);
    }

    // Post requests
    addSprint(sprint: Sprint): Observable<Sprint> {
        return this.http.post<Sprint>(`${environment.apiUrl}/sprints`, sprint);
    }

    // Put requests
    updateProgression(id: number, progression: number): Observable<boolean> {
        return this.http.put<boolean>(`${environment.apiUrl}/sprints/${id}`, progression);
    }

    // Delete requests
    deleteSprint(id: number): Observable<boolean> {
        return this.http.delete<boolean>(`${environment.apiUrl}/sprints/${id}`);
    }
}
