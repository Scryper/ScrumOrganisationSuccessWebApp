import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {UserStory} from "../../domain/user-story";
import {environment} from "../../../environments/environment";

@Injectable({
    providedIn: 'root'
})
export class UserStoriesService {
    constructor(private http: HttpClient) { }

    // Get requests
    async getByIdProject(idProject: number): Promise<UserStory[]> {
        return this.http.get<UserStory[]>(`${environment.apiUrl}/userStories/byProject/${idProject}`).toPromise();
    }

    async getById(id: number): Promise<UserStory> {
        return this.http.get<UserStory>(`${environment.apiUrl}/userStories/byId/${id}`).toPromise();
    }

    // Post requests
    async addUserStory(userStoru: UserStory){
        const httpOptions = {headers: new HttpHeaders({'Content-Type': 'application/json'})}
        return this.http.post<UserStory>(`${environment.apiUrl}/userStories`, JSON.stringify(userStoru),httpOptions).toPromise();
    }

    // Put requests
    // Modifier une userStory
    async updateUserStory(userStory: UserStory) {
        const httpOptions = {
            headers: new HttpHeaders({'Content-Type': 'application/json'})
        }
        return this.http.put<UserStory>(`${environment.apiUrl}/userStories/update/${userStory.id}`, JSON.stringify(userStory), httpOptions).toPromise();
    }

    // Delete requests
    async deleteUserStory(userStoru: UserStory): Promise<boolean> {
        return this.http.delete<boolean>(`${environment.apiUrl}/userStories/${userStoru.id}`).toPromise();
    }
}
