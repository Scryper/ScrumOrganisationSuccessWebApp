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
    getAll(): Promise<Meeting[]> {
        return this.http.get<Meeting[]>(`${environment.apiUrl}/meetings`).toPromise();
    }

    getByIdSprint(idSprint: number): Promise<Meeting[]> {
        return this.http.get<Meeting[]>(`${environment.apiUrl}/meetings/bySprint/${idSprint}`).toPromise();
    }

    getByIdUser(idUser: number): Promise<Meeting[]> {
        return this.http.get<Meeting[]>(`${environment.apiUrl}/meetings/byUser/${idUser}`).toPromise();
    }

    getById(id: number): Promise<Meeting> {
        return this.http.get<Meeting>(`${environment.apiUrl}/meetings/byId/${id}`).toPromise();
    }

    // Post requests
    addMeeting(meeting: Meeting): Promise<Meeting> {
        console.log(meeting)
        const httpOptions = {
            headers: new HttpHeaders({'Content-Type': 'application/json'})
        }
        return this.http.post<Meeting>(`${environment.apiUrl}/meetings`, JSON.stringify(meeting), httpOptions).toPromise();
    }

    // Put requests
    updateSchedule(id: number, schedule: Date): Promise<boolean> {
        return this.http.put<boolean>(`${environment.apiUrl}/meetings/${id}`, schedule).toPromise();
    }

    // Delete requests
    deleteMeeting(id: number): Promise<boolean> {
        return this.http.delete<boolean>(`${environment.apiUrl}/meetings/${id}`).toPromise();
    }
}
