import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-notification',
    templateUrl: './notification.component.html',
    styleUrls: ['../../../app.component.css', './notification.component.css']
})
export class NotificationComponent implements OnInit {
    notifsName:string[] = [
        "notif 1",
        "notif 2",
        "notif 3"
    ]
    constructor() { }

    ngOnInit(): void { }
}
