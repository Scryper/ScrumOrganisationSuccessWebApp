import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {UserStory} from "../../domain/user-story";
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class UserStoriesService {
    constructor(private http: HttpClient) { }

    // Get requests
    getByIdProject(idProject: number): Observable<UserStory[]> {
        return this.http.get<UserStory[]>(`${environment.apiUrl}/userStories/byProject/${idProject}`);
    }

    getById(id: number): Observable<UserStory> {
        return this.http.get<UserStory>(`${environment.apiUrl}/userStories/byId/${id}`);
    }

    // Post requests
    addUserStory(userStoru: UserStory): Observable<UserStory> {
        const httpOptions = {headers: new HttpHeaders({'Content-Type': 'application/json'})}
        return this.http.post<UserStory>(`${environment.apiUrl}/userStories`, JSON.stringify(userStoru),httpOptions);
    }

    // Put requests
    // Modifier une userStory
    updateUserStory(userStory: UserStory) {
        const httpOptions = {
            headers: new HttpHeaders({'Content-Type': 'application/json'})
        }
        return this.http.put<UserStory>(`${environment.apiUrl}/userStories/update/${userStory.id}`, JSON.stringify(userStory), httpOptions);
    }

    // Delete requests
    deleteUserStory(userStoru: UserStory): Observable<boolean> {
        return this.http.delete<boolean>(`${environment.apiUrl}/userStories/${userStoru.id}`);
    }
}
