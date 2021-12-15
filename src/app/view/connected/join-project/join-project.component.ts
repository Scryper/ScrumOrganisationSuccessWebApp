import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-join-project',
  templateUrl: './join-project.component.html',
  styleUrls: ['../../../app.component.css', './join-project.component.css']
})
export class JoinProjectComponent implements OnInit {

    projectsName:string[] = [
        "TCP-IP",
        "Zelda",
        "Mario"
    ]

  constructor() { }

  ngOnInit(): void {
  }

}
