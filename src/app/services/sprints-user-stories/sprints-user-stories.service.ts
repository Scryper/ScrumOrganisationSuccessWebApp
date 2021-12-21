import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import {SprintUserStory} from "../../domain/sprint-user-story";
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class SprintsUserStoriesService {
    constructor(private http: HttpClient) { }

    // Get requests
    getAll(): Observable<SprintUserStory[]> {
        return this.http.get<SprintUserStory[]>(`${environment.apiUrl}/sprintsUserStories`);
    }

    getByIdSprint(idSprint: number): Observable<SprintUserStory[]> {
        return this.http.get<SprintUserStory[]>(`${environment.apiUrl}/sprintsUserStories/byIdSprint/${idSprint}`);
    }

    getByIdUserStory(idUserStory: number): Observable<SprintUserStory[]> {
        return this.http.get<SprintUserStory[]>(`${environment.apiUrl}/sprintsUserStories/byIdUserStory/${idUserStory}`);
    }

    // Post requests
    addSprintUserStory(sprintUserStory: SprintUserStory): Observable<SprintUserStory> {
        return this.http.post<SprintUserStory>(`${environment.apiUrl}/sprintsUserStories`, sprintUserStory);
    }

    // Delete requests
    deleteSprintUserStory(idSPrint: number, idUserStory: number): Observable<boolean> {
        return this.http.delete<boolean>(`${environment.apiUrl}/sprintsUserStories/${idSPrint}, ${idUserStory}`);
    }
}
