import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-today',
    templateUrl: './today.component.html',
    styleUrls: ['../../../app.component.css', './today.component.css']
})

export class TodayComponent implements OnInit {
    title: string = "Today";

    subtitle: string[] = [
        "Meetings",
        "Todos"
    ]

    meetingsName:string[] = [
        "meeting 1",
        "meeting 2",
        "meeting 3"
    ]

    todosName:string[] = [
        "Do that 1",
        "Do that 2",
        "Do that 3"
    ]

    constructor() { }

    ngOnInit(): void {}

}
