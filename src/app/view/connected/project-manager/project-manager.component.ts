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
    isProjectAlreadyExist: boolean = false;
    buttonPressed: boolean = false;
    isProductOwner: boolean = false;
    username: string = "";
    idUser: number = 0;

    subtitles: string[] = [
        "Active project",
        "Old projects"
    ];

    activeProjectsNames: string[] = [];
    oldProjectsNames: string[] = [];

    constructor(private authenticationService: AuthenticationService,
                private developerProjectService: DevelopersProjectsService,
                private projectService: ProjectsService) { }

    ngOnInit(): void {
        this.authenticationService.currentUser.subscribe(user => {
            this.username = user.firstname;
            if(user.id != undefined) {
                this.idUser = user.id;
            }
            this.isProductOwner = user.role == 3;
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
            if(project.status == 2 || (this.isProductOwner && project.status != 3)) {
                this.activeProjectsNames.push(project.name);
            } else {
                this.oldProjectsNames.push(project.name);
            }
        });
    }
}
