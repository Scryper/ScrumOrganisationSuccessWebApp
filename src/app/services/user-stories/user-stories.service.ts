import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import {UserStory} from "../../domain/user-story";
import {environment} from "../../../environments/environment";

@Injectable({
    providedIn: 'root'
})
export class UserStoriesService {
    constructor(private http: HttpClient) { }

    // Get requests
    getByIdProject(idProject: number): Promise<UserStory[]> {
        return this.http.get<UserStory[]>(`${environment.apiUrl}/userStories/byProject/${idProject}`).toPromise();
    }

    getById(id: number): Promise<UserStory> {
        return this.http.get<UserStory>(`${environment.apiUrl}/userStories/byId/${id}`).toPromise();
    }

    // Post requests

    // Put requests

    // Delete requests
}
