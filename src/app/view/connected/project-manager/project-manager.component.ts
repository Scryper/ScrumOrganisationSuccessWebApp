import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-project-manager',
    templateUrl: './project-manager.component.html',
    styleUrls: ['../../../app.component.css', './project-manager.component.css']
})
export class ProjectManagerComponent implements OnInit {
    isProjectAlreadyExist:boolean = false;
    buttonPressed:boolean = false;

    isProductOwner:boolean = true;

    subtitle: string[] = [
        "My project",
        "Old projects"
    ]

    myProjectName:string = "Skydda";

    oldProjectsName:string[] = [
        "TCP-IP",
        "Zelda",
        "Mario"
    ]

    constructor() { }

    ngOnInit(): void { }

    toggleButtonPress(isPressed:boolean) {
        this.buttonPressed = isPressed;
    }

}
