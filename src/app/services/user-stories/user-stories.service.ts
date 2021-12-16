import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import {Observable} from "rxjs";
import {UserStory} from "../../domain/user-story";
import {environment} from "../../../environments/environment";

@Injectable({
    providedIn: 'root'
})
export class UserStoriesService {
    constructor(private http: HttpClient) { }

    // Get requests
    getAll(): Observable<UserStory[]> {
        return this.http.get<UserStory[]>(`${environment.apiUrl}/userStories`);
    }

    getByIdProject(idProject: number): Observable<UserStory[]> {
        return this.http.get<UserStory[]>(`${environment.apiUrl}/userStories/byProject/${idProject}`);
    }

    getById(id: number): Promise<UserStory> {
        return this.http.get<UserStory>(`${environment.apiUrl}/userStories/byId/${id}`).toPromise();
    }

    // Post requests
    addUserStory(userStory: UserStory): Observable<UserStory> {
        return this.http.post<UserStory>(`${environment.apiUrl}/userStories`, userStory);
    }

    // Put requests
    updateIsDone(id: number, isDone: boolean): Observable<boolean> {
        return this.http.put<boolean>(`${environment.apiUrl}/userStories/${id}`, isDone);
    }

    // Delete requests
    deleteUserStory(id: number): Observable<boolean> {
        return this.http.delete<boolean>(`${environment.apiUrl}/userStories/${id}`);
    }
}
