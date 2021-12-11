import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-navbar-product-owner',
    templateUrl: './navbar-product-owner.component.html',
    styleUrls: ['../../../../app.component.css', '../../navbar.component.css', './navbar-product-owner.component.css']
})

export class NavbarProductOwnerComponent implements OnInit {
    isOpen:boolean = false;

    constructor() { }

    ngOnInit(): void { }

    switchIsOpen() {
        this.isOpen = !this.isOpen;
    }
}
