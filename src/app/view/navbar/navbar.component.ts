import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from "../../services";
import {Role} from "../../domain/role";

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['../../app.component.css', './navbar.component.css']
})
export class NavbarComponent implements OnInit {
    RoleEnum = Role;
    role:Role = Role.Visitor;

    constructor(private authenticationService: AuthenticationService) { }

    ngOnInit(): void {
        this.authenticationService.currentUser.subscribe(()=>this.changeRole());
    }

    private changeRole() {
        let currentUser = JSON.parse(<string>localStorage.getItem('currentUser'));
        if(currentUser != null) {
            this.role = currentUser.role;
        } else {
            this.role = Role.Visitor;
        }
    }

}
