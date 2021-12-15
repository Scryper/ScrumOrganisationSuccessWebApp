import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {AuthenticationService} from "../../../services";
import {ProjectsService} from "../../../services/projects/projects.service";
import {DatePipe} from "@angular/common";

@Component({
    selector: 'app-my-project',
    templateUrl: './my-project.component.html',
    styleUrls: ['../../../app.component.css', './my-project.component.css']
})
export class MyProjectComponent implements OnInit {
    buttonIsPressed: boolean = false;
    clicked: any;
    projectName: string | null = "";
    deadline: string | null | undefined;
    description: string = "";
    repositoryUrl: string = "";

    actualSprint: ZippedSprint = {
        name: "",
        US: []
    };

    oldSprints: ZippedSprint[] = [];

    constructor(private route: ActivatedRoute,
                private authenticationService: AuthenticationService,
                private projectService: ProjectsService) { }

    ngOnInit(): void {
        this.projectName = this.route.snapshot.paramMap.get("projectName");
        this.projectService.getByProjectName(this.projectName).then(project => {
            let datePipe = new DatePipe('en-GB');
            this.deadline = datePipe.transform(project.deadline, 'dd/MM/yyyy');
            // this.deadline = project.deadline;
            this.description = project.description;
            this.repositoryUrl = project.repositoryUrl;
        });
    }

    toggleButtonPress(isPressed:boolean) {
        this.buttonIsPressed = isPressed;
    }
}

export interface ZippedSprint {
    name: string;
    US: string[];
}
