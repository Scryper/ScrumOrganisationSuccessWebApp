import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Meeting} from "../../domain/meeting";
import {environment} from "../../../environments/environment";

@Injectable({
    providedIn: 'root'
})
export class MeetingsService {
    constructor(private http: HttpClient) { }

    // Get requests
    getAll(): Observable<Meeting[]> {
        return this.http.get<Meeting[]>(`${environment.apiUrl}/meetings`);
    }

    getByIdSprint(idSprint: number): Observable<Meeting[]> {
        return this.http.get<Meeting[]>(`${environment.apiUrl}/meetings/bySprint/${idSprint}`);
    }

    getByIdUser(idUser: number): Observable<Meeting[]> {
        return this.http.get<Meeting[]>(`${environment.apiUrl}/meetings/byUser/${idUser}`);
    }

    getById(id: number): Observable<Meeting> {
        return this.http.get<Meeting>(`${environment.apiUrl}/meetings/byId/${id}`);
    }

    // Post requests
    addMeeting(meeting: Meeting): Observable<Meeting> {
        return this.http.post<Meeting>(`${environment.apiUrl}/meetings`, meeting);
    }

    // Put requests
    updateSchedule(id: number, schedule: Date): Observable<boolean> {
        return this.http.put<boolean>(`${environment.apiUrl}/meetings/${id}`, schedule);
    }

    // Delete requests
    deleteMeeting(id: number): Observable<boolean> {
        return this.http.delete<boolean>(`${environment.apiUrl}/meetings/${id}`);
    }
}
