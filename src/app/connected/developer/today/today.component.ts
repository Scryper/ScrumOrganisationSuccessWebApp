import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-today',
  templateUrl: './today.component.html',
  styleUrls: ['../../../app.component.css', './today.component.css']
})
export class TodayComponent implements OnInit {
    title: string = "Aujourd'hui";

  constructor() { }

  ngOnInit(): void {
  }

}
