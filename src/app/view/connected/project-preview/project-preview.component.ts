import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { ProjectsService } from "../../../services/projects/projects.service";
import { DatePipe } from "@angular/common";
import { DevelopersProjectsService } from "../../../services/developers-projects/developers-projects.service";
import { SosUser } from "../../../domain/sos-user";
import {DeveloperProject} from "../../../domain/developer-project";

@Component({
    selector: 'app-project-preview',
    templateUrl: './project-preview.component.html',
    styleUrls: ['../../../app.component.css', './project-preview.component.css']
})
export class ProjectPreviewComponent implements OnInit {
    isButtonPressed: boolean = false;
    unassigned: boolean = false;

    userId: number = 0;
    projectId: number = 0;

    projectName: string | null = "";
    deadline: string | null  = "";
    description: string = "";

    datePipe = new DatePipe('en-GB');
    DATE_FORMAT: string = 'dd/MM/yyyy';
    currentUser: SosUser | undefined;

    constructor(private route: ActivatedRoute,
                private projectService: ProjectsService,
                private developersProjectsService: DevelopersProjectsService) { }

    ngOnInit(): void {
        this.currentUser = <SosUser>JSON.parse(<string>localStorage.getItem('currentUser'));
        this.userId = (this.currentUser.id == undefined) ? 0 : this.currentUser.id;
        this.projectName = this.route.snapshot.paramMap.get("projectName");
        this.loadProjectInfo();
    }

    private loadProjectInfo() {
        this.getProject();
    }

    private getProject() {
        this.projectService.getByProjectName(this.projectName).then(project => {
            this.deadline = this.datePipe.transform(project.deadline, this.DATE_FORMAT);
            this.description = project.description;
            if (project.id != null) {
                this.projectId = project.id;
            }
            this.isApply();
        });
    }

    isApply() {
        this.developersProjectsService.getByIdDeveloperIdProject(this.userId, this.projectId).then(developerProject => {
            this.unassigned = developerProject != null;
        });
    }

    toggleButtonPress(isPressed: boolean) {
        this.isButtonPressed = isPressed;
    }

    requestToJoin() {
        let appliance: DeveloperProject = {
            idDeveloper: this.userId,
            idProject: this.projectId,
            isAppliance: true
        };
        this.developersProjectsService.addDeveloperProject(appliance).then(result => {
            if(result != null) {
                this.unassigned = !this.unassigned;
            }
        });
    }
}
