import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Sprint } from "../../domain/sprint";
import {environment} from "../../../environments/environment";

@Injectable({
    providedIn: 'root'
})
export class SprintsService {
    constructor(private http: HttpClient) { }

    // Get requests
    async getAll(): Promise<Sprint[]> {
        return this.http.get<Sprint[]>(`${environment.apiUrl}/sprints`).toPromise();
    }

    async getByIdProject(idProject: number): Promise<Sprint[]> {
        return this.http.get<Sprint[]>(`${environment.apiUrl}/sprints/byProject/${idProject}`).toPromise();
    }

    async getById(id: number): Promise<Sprint> {
        return this.http.get<Sprint>(`${environment.apiUrl}/sprints/byId/${id}`).toPromise();
    }

    // Post requests
    async addSprint(sprint: Sprint): Promise<Sprint> {
        return this.http.post<Sprint>(`${environment.apiUrl}/sprints`, sprint).toPromise();
    }

    // Delete requests
    async deleteSprint(id: number): Promise<boolean> {
        return this.http.delete<boolean>(`${environment.apiUrl}/sprints/${id}`).toPromise();
    }
}
