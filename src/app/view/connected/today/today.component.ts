import { Component, OnInit } from '@angular/core';
import {MeetingsService} from "../../../services/meetings/meetings.service";
import {AuthenticationService} from "../../../services";
import {Meeting} from "../../../domain/meeting";

@Component({
    selector: 'app-today',
    templateUrl: './today.component.html',
    styleUrls: ['../../../app.component.css', './today.component.css']
})

export class TodayComponent implements OnInit {
    title: string = "Today";
    subtitle: string = "Meetings";
    meetingsName:string[] = ["No meetings today."];
    NUMBER_OF_PARTS: number = 3;

    constructor(private meetingService: MeetingsService,
                private authenticationService: AuthenticationService) { }

    ngOnInit(): void {
        this.getUserId();
    }

    private getUserId() {
        this.authenticationService.currentUser.subscribe(user => {
            if (user.id != null) {
                this.loadEvents(user.id);
            }
        });
    }

    private loadEvents(id: number) {
        this.meetingService.getByIdUser(id).then(meetings => {
            for (let i = 0 ; i < meetings.length ; i++) {
                let meeting: Meeting = meetings[i];
                let todayAsDate: Date = new Date();
                let meetingAsDate: Date = new Date(meeting.schedule);

                // Offset which allows to know if a meeting is between now and the end of the day
                let slicedTodaysDate: number[] = this.sliceDateParts(todayAsDate);
                let slicedMeetingDate: number[] = this.sliceDateParts(meetingAsDate);

                // if the date of the meeting is today
                // add it to the list of meetings
                if(this.isSameDate(slicedTodaysDate, slicedMeetingDate)) {
                    if(this.meetingsName[0] == "No meetings today.") {
                        this.meetingsName.pop();
                    }
                    this.meetingsName.push(meeting.description);
                }
            }
        });
    }

    // Slices the date in different parts (day, month, year)
    private sliceDateParts(todayAsDate: Date): number[] {
        let slices: number[] = [];

        slices.push(todayAsDate.getDate());
        slices.push(todayAsDate.getMonth());
        slices.push(todayAsDate.getFullYear());

        return slices;
    }

    private isSameDate(slicedTodaysDate: number[], slicedMeetingDate: number[]): boolean {
        for (let i = 0; i < this.NUMBER_OF_PARTS; i++) {
            if(slicedTodaysDate[i] != slicedMeetingDate[i]) return false;
        }
        return true;
    }
}
