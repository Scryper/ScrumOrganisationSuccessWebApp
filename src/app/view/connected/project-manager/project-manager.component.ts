import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from "../../../services";
import {ProjectsService} from "../../../services/projects/projects.service";
import {UsersProjectsService} from "../../../services/developers-projects/users-projects.service";
import {Project} from "../../../domain/project";
import {Router} from "@angular/router";



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

    activeProjects: Project[] = [];
    oldProjects: Project[] = [];

    noProjectsFound:string = "No projects found.";
    isActiveProjctsEmpty:boolean = false;

    subtitles: string[] = [
        "Active project",
        "Active projects",
        "Old projects"
    ];

    constructor(private authenticationService: AuthenticationService,
                private developerProjectService: UsersProjectsService,
                private projectService: ProjectsService,
                private route: Router) { }

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
        this.activeProjects = [
            {
                id: 0,
                name: this.noProjectsFound,
                status: 0,
                description: "",
                deadline: new Date(),
                repositoryUrl: ""
            }
        ];

        this.oldProjects = [
            {
                id: 0,
                name: this.noProjectsFound,
                status: 0,
                description: "",
                deadline: new Date(),
                repositoryUrl: ""
            }
        ];
        this.developerProjectService.getByIdDeveloper(this.idUser).then(developerProjects => {
            for (let i = 0 ; i < developerProjects.length ; i++) {
                this.getProjectName(developerProjects[i].idProject);
            }
        });
    }

    private getProjectName(idProject: number) {
        this.projectService.getById(idProject).then(project => {
            if(project.status == this.STATUS_ACTIVE || (project.status == this.STATUS_INACTIVE && this.isProductOwner)) {
                if(this.activeProjects[0].name == this.noProjectsFound) {
                    this.activeProjects.pop();
                }
                this.activeProjects.push(project);
            } else {
                if(this.oldProjects[0].name == this.noProjectsFound) {
                    this.oldProjects.pop();
                }
                this.oldProjects.push(project);
            }
            // INSERT
            if(this.activeProjects.length == 0 || (this.activeProjects.length == 1 && this.activeProjects[0].name == this.noProjectsFound ) ) {
                this.isActiveProjctsEmpty = true;
            }
        });
    }

    terminate(project:Project) {
        project.status = 3;
        this.projectService.updateStatus(project).then(()=>{
            this.loadProjects();
        });
    }

    navigateIfActiveProjectNotEmpty(projectName:string) {
        console.log(this.isActiveProjctsEmpty);
        if(!this.isActiveProjctsEmpty) {
            this.route.navigate(['/myProject', projectName]);
        }
    }
}
