import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import {SprintUserStory} from "../../domain/sprint-user-story";
import {environment} from "../../../environments/environment";

@Injectable({
    providedIn: 'root'
})
export class SprintsUserStoriesService {
    constructor(private http: HttpClient) { }

    // Get requests
    getAll(): Promise<SprintUserStory[]> {
        return this.http.get<SprintUserStory[]>(`${environment.apiUrl}/sprintsUserStories`).toPromise();
    }

    getByIdSprint(idSprint: number): Promise<SprintUserStory[]> {
        return this.http.get<SprintUserStory[]>(`${environment.apiUrl}/sprintsUserStories/byIdSprint/${idSprint}`).toPromise();
    }

    getByIdUserStory(idUserStory: number): Promise<SprintUserStory[]> {
        return this.http.get<SprintUserStory[]>(`${environment.apiUrl}/sprintsUserStories/byIdUserStory/${idUserStory}`).toPromise();
    }

    // Post requests
    addSprintUserStory(sprintUserStory: SprintUserStory): Promise<SprintUserStory> {
        return this.http.post<SprintUserStory>(`${environment.apiUrl}/sprintsUserStories`, sprintUserStory).toPromise();
    }

    // Delete requests
    deleteSprintUserStory(idSPrint: number, idUserStory: number): Promise<boolean> {
        return this.http.delete<boolean>(`${environment.apiUrl}/sprintsUserStories/${idSPrint}, ${idUserStory}`).toPromise();
    }
}
