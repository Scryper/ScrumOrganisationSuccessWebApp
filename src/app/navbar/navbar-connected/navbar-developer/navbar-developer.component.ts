import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-navbar-developer',
    templateUrl: './navbar-developer.component.html',
    styleUrls: ['../../../app.component.css', '../../navbar.component.css', './navbar-developer.component.css']
})

export class NavbarDeveloperComponent implements OnInit {

    isOpen:boolean = false;

    constructor() { }

    ngOnInit(): void {}

    switchIsOpen() {
        this.isOpen = !this.isOpen;
    }
}
