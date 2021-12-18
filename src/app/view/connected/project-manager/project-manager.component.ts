import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from "../../../services";
import {ProjectsService} from "../../../services/projects/projects.service";
import {DevelopersProjectsService} from "../../../services/developers-projects/developers-projects.service";

@Component({
    selector: 'app-project-manager',
    templateUrl: './project-manager.component.html',
    styleUrls: ['../../../app.component.css', './project-manager.component.css']
})
export class ProjectManagerComponent implements OnInit {
    private STATUS_INACTIVE: number = 1;
    private STATUS_ACTIVE: number = 2;
    isProjectAlreadyExist: boolean = false;
    buttonPressed: boolean = false;
    isProductOwner: boolean = false;
    username: string = "";
    idUser: number = 0;

    subtitles: string[] = [
        "Active project",
        "Active projects",
        "Old projects"
    ];

    activeProjectsNames: string[] = ["No projects found."];
    oldProjectsNames: string[] = ["No projects found."];

    constructor(private authenticationService: AuthenticationService,
                private developerProjectService: DevelopersProjectsService,
                private projectService: ProjectsService) { }

    ngOnInit(): void {
        this.authenticationService.currentUser.subscribe(user => {
            if(user != null) {
                this.username = user.firstname;
                if(user.id != undefined) {
                    this.idUser = user.id;
                }
                this.isProductOwner = user.role == 3;
            }

        });
        this.loadProjects();
    }

    toggleButtonPress(isPressed:boolean) {
        this.buttonPressed = isPressed;
    }

    private loadProjects() {
        this.developerProjectService.getByIdDeveloper(this.idUser).then(developerProjects => {
            for (let i = 0 ; i < developerProjects.length ; i++) {
                this.getProjectName(developerProjects[i].idProject);
            }
        });
    }

    private getProjectName(idProject: number) {
        this.projectService.getById(idProject).then(project => {
            if(project.status == this.STATUS_ACTIVE || (project.status == this.STATUS_INACTIVE && this.isProductOwner)) {
                if(this.activeProjectsNames[0] == "No projects found.") {
                    this.activeProjectsNames.pop();
                }
                this.activeProjectsNames.push(project.name);
            } else {
                if(this.oldProjectsNames[0] == "No projects found.") {
                    this.oldProjectsNames.pop();
                }
                this.oldProjectsNames.push(project.name);
            }
        });
    }
}
