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
        "User stories"
    ]

    meetingsName:string[] = [
        "meeting 1",
        "meeting 2",
        "meeting 3"
    ]

    todosName:string[] = [
        "User story 1",
        "User story 3",
        "User story 5"
    ]

    constructor() { }

    ngOnInit(): void {}

}
