import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
    selector: 'app-my-project',
    templateUrl: './my-project.component.html',
    styleUrls: ['../../../app.component.css', './my-project.component.css']
})
export class MyProjectComponent implements OnInit {

    sprintActual = {
        name: "Sprint 4",
        US: [
            "US7 - Time mode",
            "US8 - Round mode"
        ]
    };

    oldSprint = [
        {
            name: "Sprint 1",
            US: [
                "US1 - Move players",
                "US2 - Fight"
            ]
        },
        {
            name: "Sprint 2",
            US: [
                "US3 - Defend",
                "US4 - Fly"
            ]
        },
        {
            name: "Sprint 3",
            US: [
                "US5 - Animation",
                "US6 - Collision"
            ]
        }
    ];

    nameProject: string | null = "";

    constructor(private route: ActivatedRoute) {}

    ngOnInit(): void {
        this.nameProject = this.route.snapshot.paramMap.get("nameProject");
    }

    buttonIsPressed: boolean = false;
    clicked: any;

    toggleButtonPress(isPressed:boolean) {
        this.buttonIsPressed = isPressed;
    }

}
