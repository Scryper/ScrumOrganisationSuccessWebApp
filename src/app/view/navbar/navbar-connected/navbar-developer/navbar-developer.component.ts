import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from "../../../../services";

@Component({
    selector: 'app-navbar-developer',
    templateUrl: './navbar-developer.component.html',
    styleUrls: ['../../../../app.component.css', '../../navbar.component.css', './navbar-developer.component.css']
})

export class NavbarDeveloperComponent implements OnInit {

    userType:string = "Developer";

    logo = {
        img: "Logo.png",
        router: "today"
    }

    leftMenu = [
        {
            name: "Projects",
            router:"projectManager"
        },
        {
            name: "Meetings",
            router:"meetings"
        }
    ]

    rightMenu = [
        {
            img: "anonym_round.png",
            name: "",
            router:"profile"
        },
        {
            img: "bell.png",
            name: "",
            router:"notification"
        },
        {
            img: "",
            name: "Developer",
            router:""
        }
    ]

    constructor(private authenticationService: AuthenticationService) { }

    ngOnInit(): void {
        this.authenticationService.currentUser.subscribe(()=>this.changeName());
    }

    private changeName() {
        let currentUser = JSON.parse(<string>localStorage.getItem('currentUser'));
        if(currentUser != null) {
            // Actualise name of User in rightMenu
            this.rightMenu[0].name = currentUser.firstname;
        }
    }

}
