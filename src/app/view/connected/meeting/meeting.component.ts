import { Component, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/angular';
import {MeetingsService} from "../../../services/meetings/meetings.service";
import {AuthenticationService} from "../../../services";

@Component({
    selector: 'app-meeting',
    templateUrl: './meeting.component.html',
    styleUrls: ['./meeting.component.css', '../../../app.component.css']
})
export class MeetingComponent implements OnInit {
    username: string = "";

    calendarOptions: CalendarOptions = {
        initialView: 'dayGridMonth',
        dateClick: this.handleDateClick.bind(this),
        weekends: false,
        locale: 'fr'
    };

    constructor(private meetingService: MeetingsService,
                private authenticationService: AuthenticationService) { }

    ngOnInit(): void {
        this.getUserInfo();
    }

    handleDateClick(arg: any) {
        console.log('clic sur la date : ' + arg.dateStr);
    }

    loadEvents(id: number) {
        this.meetingService.getByIdUser(id).then(meetings => {
            let events = [];
            for (let i = 0; i < meetings.length; i++) {
                 events.push({title: meetings[i].description, date: meetings[i].schedule});
            }
            this.calendarOptions.events = events;
        });
    }

    private getUserInfo() {
        this.authenticationService.currentUser.subscribe(user => {
            if (user != null) {
                if (user.id != null) {
                    this.loadEvents(user.id);
                }
                this.username = user.firstname;
            }

        });
    }
}
