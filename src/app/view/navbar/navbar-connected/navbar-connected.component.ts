import {Component, Input, OnInit} from '@angular/core';
import {AuthenticationService} from "../../../services";

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

    constructor(private authenticationService: AuthenticationService) { }

    ngOnInit(): void {

    }

    isOpen:boolean = false;

    switchIsOpen() {
        this.isOpen = !this.isOpen;
    }

    logOut() {
        this.authenticationService.logout();
    }
}
