import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['../../app.component.css', './home.component.css']
})
export class HomeComponent implements OnInit {
    title:string = "Scrum Organisation Success";

    constructor() { }

    ngOnInit(): void { }
}
