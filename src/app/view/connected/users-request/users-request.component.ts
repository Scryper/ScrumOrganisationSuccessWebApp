import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {SosUser} from "../../../domain/sos-user";
import {UsersProjectsService} from "../../../services/developers-projects/users-projects.service";
import {Project} from "../../../domain/project";
import {ProjectsService} from "../../../services/projects/projects.service";
import {UserService} from "../../../services";

@Component({
  selector: 'app-users-request',
  templateUrl: './users-request.component.html',
  styleUrls: ['../../../app.component.css', './users-request.component.css']
})
export class UsersRequestComponent implements OnInit {

    idAppliedDevelopers:number[] = []
    idAppliedScrumMasters:number[] = []

    appliedDevelopers:SosUser[] = []
    appliedScrumMasters:SosUser[] = []

    activeProjects:Project = null!;

    allProjects:Project[] = [];

    constructor(private route: ActivatedRoute,
                private developersProjectsService: UsersProjectsService,
                private projectService: ProjectsService,
                private userService:UserService) { }

    ngOnInit(): void {
        this.activeProjects = {
            id: 0,
            name: "No projects found.",
            status: 0,
            description: "",
            deadline: new Date(),
            repositoryUrl: ""
        };
        let tmpUser = JSON.parse(<string>localStorage.getItem('currentUser'));
        this.nameProject = this.route.snapshot.paramMap.get("nameProject");
        let tmpIdProject:number;
        // Get tous projet de l'user
        this.developersProjectsService.getByIdDeveloperIsAppliance(tmpUser.id).then(tmp =>{
            tmpIdProject = tmp[0].idProject;

            this.projectService.getAll().then(projects=>{
                this.allProjects = projects;
                for (let elt of this.allProjects) {
                    if(elt.status == 2 && elt.id == tmpIdProject) {
                        this.activeProjects = elt;
                    }
                }
                this.developersProjectsService.getDevelopersByIdProject(this.activeProjects.id).then(tmp => {
                    for(let elt of Object.values(tmp)) {
                        this.idAppliedDevelopers.push(elt.idDeveloper);
                    }


                    for(let elt2 of this.idAppliedDevelopers) {
                        this.userService.getById(elt2).then(tmp => {
                            this.appliedDevelopers.push(tmp);
                        });
                    }

                    this.developersProjectsService.getScrumMasterByIdProject(this.activeProjects.id).then(tmp => {
                        for(let elt of Object.values(tmp)) {
                            this.idAppliedScrumMasters.push(elt.idDeveloper);
                        }

                        for(let elt2 of this.idAppliedScrumMasters) {
                            this.userService.getById(elt2).then(tmp => {
                                this.appliedScrumMasters.push(tmp);
                            });
                        }
                        // appliedDevelopers OK
                        // appliedScrumMasters OK
                        console.log(this.appliedDevelopers);
                        console.log(this.appliedScrumMasters);

                    });
                });


            });
        });

    }

    accept(item:any) {
        console.log("accept " + item);
    }

    refuse(item:any) {
        console.log("refuse " + item);
    }

    nameProject: string | null = "";

    buttonIsPressed: boolean = false;
    clicked: any;

    toggleButtonPress(isPressed:boolean) {
        this.buttonIsPressed = isPressed;
    }

}
