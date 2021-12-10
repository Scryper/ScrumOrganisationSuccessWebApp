import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-project-manager',
  templateUrl: './project-manager.component.html',
  styleUrls: ['../../../app.component.css', './project-manager.component.css']
})
export class ProjectManagerComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

    buttonMyProjectIsPressed: boolean = false;
    buttonCreateProjectIsPressed: boolean = false;
    buttonOldProjectsIsPressed: boolean = false;

    toggleButtonMyProjectPress(isPressed:boolean) {
        if(isPressed) {
            this.buttonMyProjectIsPressed = true;
        } else {
            this.buttonMyProjectIsPressed = false;
        }
    }
    toggleButtonCreateProjectPress(isPressed:boolean) {
        if(isPressed) {
            this.buttonCreateProjectIsPressed = true;
        } else {
            this.buttonCreateProjectIsPressed = false;
        }
    }
    toggleButtonOldProjectsPress(isPressed:boolean) {
        if(isPressed) {
            this.buttonOldProjectsIsPressed = true;
        } else {
            this.buttonOldProjectsIsPressed = false;
        }
    }

}
