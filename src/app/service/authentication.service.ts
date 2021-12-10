import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {SosUser} from "../domain/SosUser";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<SosUser>;
    public currentUser: Observable<SosUser>;

    constructor(private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<SosUser>(JSON.parse(localStorage.getItem('currentUser')||'{}')); //CAST??
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): SosUser {
        return this.currentUserSubject.value;
    }

    login(username: string, password: string) {
        return this.http.post<any>(`${environment.apiUrl}/users/authenticate`, { username, password })
            .pipe(map(user => {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('currentUser', JSON.stringify(user));
                this.currentUserSubject.next(user);
                return user;
            }));
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null!);
    }
}
