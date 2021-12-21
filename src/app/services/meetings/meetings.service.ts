import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Meeting} from "../../domain/meeting";
import {environment} from "../../../environments/environment";

@Injectable({
    providedIn: 'root'
})
export class MeetingsService {
    constructor(private http: HttpClient) { }

    // Get requests
    async getAll(): Promise<Meeting[]> {
        return this.http.get<Meeting[]>(`${environment.apiUrl}/meetings`).toPromise();
    }

    async getByIdSprint(idSprint: number): Promise<Meeting[]> {
        return this.http.get<Meeting[]>(`${environment.apiUrl}/meetings/bySprint/${idSprint}`).toPromise();
    }

    async getByIdUser(idUser: number): Promise<Meeting[]> {
        return this.http.get<Meeting[]>(`${environment.apiUrl}/meetings/byUser/${idUser}`).toPromise();
    }

    async getById(id: number): Promise<Meeting> {
        return this.http.get<Meeting>(`${environment.apiUrl}/meetings/byId/${id}`).toPromise();
    }

    // Post requests
    async addMeeting(meeting: Meeting): Promise<Meeting> {
        const httpOptions = {
            headers: new HttpHeaders({'Content-Type': 'application/json'})
        }
        return this.http.post<Meeting>(`${environment.apiUrl}/meetings`, JSON.stringify(meeting), httpOptions).toPromise();
    }

    // Put requests
    async updateSchedule(id: number, schedule: Date): Promise<boolean> {
        return this.http.put<boolean>(`${environment.apiUrl}/meetings/${id}`, schedule).toPromise();
    }

    // Delete requests
    async deleteMeeting(id: number): Promise<boolean> {
        return this.http.delete<boolean>(`${environment.apiUrl}/meetings/${id}`).toPromise();
    }
}
