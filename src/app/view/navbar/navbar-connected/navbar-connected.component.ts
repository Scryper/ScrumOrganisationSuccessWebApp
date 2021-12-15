import {Component, Input, OnInit} from '@angular/core';
import {AuthenticationService} from "../../../services";
import {Router} from "@angular/router";

@Component({
    selector: 'app-navbar-connected',
    templateUrl: './navbar-connected.component.html',
    styleUrls: ['./navbar-connected.component.css', '../../../app.component.css', '../navbar.component.css']
})

export class NavbarConnectedComponent implements OnInit {
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
        this.authenticationService.currentUser.subscribe(()=>this.changeName());
    }

    isOpen:boolean = false;

    switchIsOpen() {
        this.isOpen = !this.isOpen;
    }

    logOut() {
        this.authenticationService.logout();
        this.router.navigate([""]);
    }

    private changeName() {
        let currentUser = JSON.parse(<string>sessionStorage.getItem('currentUser'));
        if(currentUser != null) {
            // Actualise name of User in rightMenu
            this.rightMenu[0].name = currentUser.firstname;
        }
    }
}
