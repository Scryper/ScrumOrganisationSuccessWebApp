import { Component, OnInit } from '@angular/core';
import { CalendarOptions} from '@fullcalendar/angular';
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
        eventClick : function (event){
            localStorage.setItem('roomName', event.event.extendedProps.roomName);
        },
        weekends: false,
        locale: 'fr'
    };


    constructor(private meetingService: MeetingsService,
                private authenticationService: AuthenticationService) { }

    ngOnInit(): void {
        this.getUserInfo();
    }

    handleDateClick(arg: any) {
        console.log('clic sur la date : ' + arg.link);
    }

    loadEvents(id: number) {
        this.meetingService.getByIdUser(id).then(meetings => {
            let events = [];
            for (let i = 0; i < meetings.length; i++) {
                 events.push({title: meetings[i].description,
                        date: meetings[i].schedule,
                        url : 'videocall',
                        roomName : meetings[i].meetingUrl
                 });
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
