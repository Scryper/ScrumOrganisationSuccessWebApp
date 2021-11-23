import { Component, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/angular'; // fullcalendar

@Component({
  selector: 'app-meeting',
  templateUrl: './meeting.component.html',
  styleUrls: ['./meeting.component.css']
})
export class MeetingComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

    calendarOptions: CalendarOptions = {
        initialView: 'dayGridMonth',
        dateClick: this.handleDateClick.bind(this),
        weekends: false,
        locale: 'fr',
        events: [
            { title: 'Rendez-vous 1', date: '2021-11-23' },
            { title: 'Rendez-vous 2', date: '2021-11-25' }
        ]
    };

    handleDateClick(arg:any) {
        console.log('clic sur la date : ' + arg.dateStr)
    }

}
