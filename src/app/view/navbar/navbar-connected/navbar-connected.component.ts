import {Component, Input, OnInit} from '@angular/core';
import {AuthenticationService} from "../../../services";
import {Router} from "@angular/router";
import {SosUser} from "../../../domain/sos-user";

@Component({
    selector: 'app-navbar-connected',
    templateUrl: './navbar-connected.component.html',
    styleUrls: ['./navbar-connected.component.css', '../../../app.component.css', '../navbar.component.css']
})

export class NavbarConnectedComponent implements OnInit {
    isOpen:boolean = false;

    @Input()
    userType:string = "";

    @Input()
    logo = {
        img: "",
        router: ""
    }

    @Input()
    leftMenu = [
        {
            name: "",
            router:""
        },
        {
            name: "",
            router:""
        }
    ]

    @Input()
    rightMenu = [
        {
            img: "",
            name: "",
            router:""
        },
        {
            img: "",
            name: "",
            router:""
        },
        {
            img: "",
            name: "",
            router:""
        }
    ]

    constructor(private authenticationService: AuthenticationService,
                private router : Router) { }

    ngOnInit(): void {
        this.authenticationService.currentUser.subscribe(user => this.changeName(user));
    }

    switchIsOpen() {
        this.isOpen = !this.isOpen;
    }

    logOut() {
        this.authenticationService.logout();
        this.router.navigate(["login"]);
    }

    private changeName(user: SosUser) {
        if(user != null) {
            // Actualise name of User in rightMenu
            if (user.profilePicture != null) {
                this.rightMenu[0].img = user.profilePicture;
            }
            this.rightMenu[0].name = user.firstname;
        }
    }
}
