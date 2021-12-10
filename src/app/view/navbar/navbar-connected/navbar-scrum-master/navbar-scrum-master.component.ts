import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-navbar-scrum-master',
    templateUrl: './navbar-scrum-master.component.html',
    styleUrls: ['../../../app.component.css', '../../navbar.component.css', './navbar-scrum-master.component.css']
})

export class NavbarScrumMasterComponent implements OnInit {
    isOpen:boolean = false;

    constructor() { }

    ngOnInit(): void { }

    switchIsOpen() {
        this.isOpen = !this.isOpen;
    }
}
