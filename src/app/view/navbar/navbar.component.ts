import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from "../../services";

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['../../app.component.css', './navbar.component.css']
})

export class NavbarComponent implements OnInit {

    private _role:Number = 0;

    get role(): Number {
        return this._role;
    }

    constructor(private authenticationService: AuthenticationService) {

    }

    ngOnInit(): void {
        this.authenticationService.currentUser.subscribe(()=>this.changeRole());
    }

    private changeRole() {
        let currentUser = JSON.parse(<string>localStorage.getItem('currentUser'));
        if(currentUser != null) {
            this._role = currentUser.role;
        } else {
            this._role = 0;

        }

    }



}
