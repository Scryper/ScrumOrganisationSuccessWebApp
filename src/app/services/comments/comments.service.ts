import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { SosComment } from "../../domain/sos-comment";
import { environment } from "../../../environments/environment";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class CommentsService {
    constructor(private http: HttpClient) { }

    // Get requests
    getAll(): Observable<SosComment[]> {
        return this.http.get<SosComment[]>(`${environment.apiUrl}/comments`);
    }

    getByIdUserStory(idUserStory: number): Observable<SosComment[]> {
        return this.http.get<SosComment[]>(`${environment.apiUrl}/comments/byUserStory/${idUserStory}`);
    }

    getById(id: number): Observable<SosComment> {
        return this.http.get<SosComment>(`${environment.apiUrl}/comments/byId/${id}`);
    }

    // Post requests
    addComment(comment: SosComment): Observable<SosComment> {
        return this.http.post<SosComment>(`${environment.apiUrl}/comments`, comment);
    }

    // Put requests
    updateContent(id: number, content: string): Observable<boolean> {
        return this.http.put<boolean>(`${environment.apiUrl}/comments/${id}`, content);
    }

    // Delete requests
    deleteComment(id: number): Observable<boolean> {
        return this.http.delete<boolean>(`${environment.apiUrl}/comments/${id}`);
    }
}
