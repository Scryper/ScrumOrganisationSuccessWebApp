import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-project-manager',
    templateUrl: './project-manager.component.html',
    styleUrls: ['../../../../app.component.css', './project-manager.component.css']
})
export class ProjectManagerComponent implements OnInit {
    buttonMyProjectIsPressed: boolean = false;
    buttonCreateProjectIsPressed: boolean = false;
    buttonOldProjectsIsPressed: boolean = false;

    constructor() { }

    ngOnInit(): void { }

    toggleButtonMyProjectPress(isPressed:boolean) {
        this.buttonMyProjectIsPressed = isPressed;
    }
    toggleButtonCreateProjectPress(isPressed:boolean) {
        this.buttonCreateProjectIsPressed = isPressed;
    }
    toggleButtonOldProjectsPress(isPressed:boolean) {
        this.buttonOldProjectsIsPressed = isPressed;
    }
}
