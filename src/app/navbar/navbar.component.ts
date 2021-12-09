import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['../app.component.css', './navbar.component.css']
})

export class NavbarComponent implements OnInit {
    constructor() { }

    isOpen:boolean = false;

    ngOnInit(): void { }

    switchIsOpen() {
        this.isOpen = !this.isOpen;
    }
}
