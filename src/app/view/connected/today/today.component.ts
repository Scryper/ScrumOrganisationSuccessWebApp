import {Component, OnInit} from '@angular/core';
import { MeetingsService } from "../../../services/meetings/meetings.service";
import { AuthenticationService } from "../../../services";
import { Meeting } from "../../../domain/meeting";
import {Router} from "@angular/router";

@Component({
    selector: 'app-today',
    templateUrl: './today.component.html',
    styleUrls: ['../../../app.component.css', './today.component.css']
})
export class TodayComponent implements OnInit {
    title: string = "Today";
    subtitle: string = "Meetings";
    meetings: ZippedMeeting[] = [
        {
            name: "No meetings today.",
            meetingUrl: null
        }
    ];
    NUMBER_OF_PARTS: number = 3;

    constructor(private meetingService: MeetingsService,
                private authenticationService: AuthenticationService,
                private router: Router) { }

    ngOnInit(): void {
        this.getUserId();
    }

    private getUserId() {
        this.authenticationService.currentUser.subscribe(user => {
            if (user != null) {
                if (user.id != null) {
                    this.loadEvents(user.id);
                }
            }
        });
    }

    private loadEvents(id: number) {
        // this.meetingService.getByIdUser(id).then(meetings => {
        //     for (let i = 0 ; i < meetings.length ; i++) {
        //         let meeting: Meeting = meetings[i];
        //         let todayAsDate: Date = new Date();
        //         let meetingAsDate: Date = new Date(meeting.schedule); // converting db date to angular date
        //
        //         // slice day month and year to compare dates
        //         let slicedTodaysDate: number[] = this.sliceDateParts(todayAsDate);
        //         let slicedMeetingDate: number[] = this.sliceDateParts(meetingAsDate);
        //
        //         // if the date of the meeting is today
        //         // add it to the list of meetings
        //         if(this.isSameDate(slicedTodaysDate, slicedMeetingDate)) {
        //             if(this.meetings[0].name == "No meetings today.") {
        //                 this.meetings.pop();
        //             }
        //
        //             // displays the schedule to xxhxx
        //             let meetingHourSchedule: string = " ";
        //             meetingHourSchedule += meetingAsDate.getHours() + "h";
        //             meetingHourSchedule += (meetingAsDate.getMinutes() == 0) ? "00" : meetingAsDate.getMinutes();
        //             this.meetings.push({name: meeting.description + meetingHourSchedule, meetingUrl: meeting.meetingUrl});
        //         }
        //     }
        // });
    }

    // Slices the date in different parts (day, month, year)
    private sliceDateParts(todayAsDate: Date): number[] {
        let slices: number[] = [];

        slices.push(todayAsDate.getDate()); // getDate -> X because getDate returns the day's number
        slices.push(todayAsDate.getMonth());
        slices.push(todayAsDate.getFullYear());

        return slices;
    }

    private isSameDate(slicedTodaysDate: number[], slicedMeetingDate: number[]): boolean {
        // compare the different parts, if one is different : it is not today
        for (let i = 0 ; i < this.NUMBER_OF_PARTS ; i++) {
            if(slicedTodaysDate[i] != slicedMeetingDate[i]) return false;
        }
        return true;
    }

    goToMeeting(meetingUrl: string | null) {
        if(meetingUrl != null) { // The "default" meeting has null as meetingurl
            this.router.navigate(['/meetings']);
        }
    }
}
export interface ZippedMeeting {
    name: string,
    meetingUrl: string | null
}
