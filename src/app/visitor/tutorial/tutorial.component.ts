import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tutorial',
  templateUrl: './tutorial.component.html',
  styleUrls: ['../../app.component.css', './tutorial.component.css']
})
export class TutorialComponent implements OnInit {

    title:string = "Tutorial";

  constructor() { }

  ngOnInit(): void {
  }

}
