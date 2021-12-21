import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {SosUser} from "../../../domain/sos-user";
import {UsersProjectsService} from "../../../services/developers-projects/users-projects.service";
import {Project} from "../../../domain/project";
import {ProjectsService} from "../../../services/projects/projects.service";
import {UserService} from "../../../services";
import {DevelopersTechnologiesService} from "../../../services/developers-technologies/developers-technologies.service";
import {TechnologiesService} from "../../../services/technologies/technologies.service";
import {UserProject} from "../../../domain/user-project";

interface idUserTechno {
    idUser:number,
    Technology:string
}

@Component({
  selector: 'app-users-request',
  templateUrl: './users-request.component.html',
  styleUrls: ['../../../app.component.css', './users-request.component.css']
})

export class UsersRequestComponent implements OnInit {
    private STATUS_INACTIVE: number = 1;
    private STATUS_ACTIVE: number = 2;
    private STATUS_TERMINATE: number = 3;

    private ROLE_DEVELOPER: number = 1;
    private ROLE_SCRUM_MASTER: number = 2;

    nameProject: string | null = "";
    buttonIsPressed: boolean = false;
    clicked: any;

    idProjectActive: number | undefined;

    currentUser:SosUser = null!;

    idAppliedDevelopers:number[] = []
    idAppliedScrumMasters:number[] = []

    appliedDevelopers:SosUser[] = []
    appliedScrumMasters:SosUser[] = []

    usersApplianceArray:SosUser[] =[];

    activeProjects:Project = null!;
    allProjects:Project[] = [];

    TechnologyDevelopers:idUserTechno[] = [];
    TechnologyScrumMasters:idUserTechno[] = [];

    constructor(private route: ActivatedRoute,
                private developersProjectsService: UsersProjectsService,
                private projectService: ProjectsService,
                private userService:UserService,
                private developersTechnologiesService:DevelopersTechnologiesService,
                private technologiesService:TechnologiesService) { }

    fillIdTechnologyDevelopers(user:SosUser){
        this.developersTechnologiesService.getByDeveloperId(user.id).then(DevTechnoArray =>{
            for(let DevTechno of DevTechnoArray) {
                this.technologiesService.getById(DevTechno.idTechnology).then(techno =>{
                    this.TechnologyDevelopers.push({idUser:DevTechno.idUser,Technology:techno.name});
                });
            }
        });
    }

    fillIdTechnologyScrumMasters(user:SosUser){
        this.developersTechnologiesService.getByDeveloperId(user.id).then(SMTechnoArray =>{
            for(let SMTechno of SMTechnoArray) {
                this.technologiesService.getById(SMTechno.idTechnology).then(techno =>{
                    this.TechnologyScrumMasters.push({idUser:SMTechno.idUser,Technology:techno.name});
                });
            }
        });
    }

    ngOnInit(): void {
        this.activeProjects = {
            id: 0,
            name: "No projects found.",
            status: 0,
            description: "",
            deadline: new Date(),
            repositoryUrl: ""
        };
        this.nameProject = this.route.snapshot.paramMap.get("nameProject");
        this.fillUsersRequest();
    }

    private fillUsersRequest() {
        let tmpUser = JSON.parse(<string>localStorage.getItem('currentUser'));
        this.getDevelopersProjectsByIdDeveloperIsAppliance(tmpUser);
    }
    private getDevelopersProjectsByIdDeveloperIsAppliance(tmpUser:any) {
        // Get tous projet de l'user
        this.developersProjectsService.getByIdDeveloper(tmpUser.id).then(tmp =>{
            for(let elt of tmp) {
                if(elt.isAppliance) {
                    this.idProjectActive = elt.idProject;
                    this.getAllUsersByIdProject(this.idProjectActive)
                }
            }
        });
    }

    private getAllUsersByIdProject(idProjectActive: number) {
        this.developersProjectsService.getUsersByIdProject(idProjectActive).then(tmp=> {
            for(let elt of Object.values(tmp)) {
                if(!elt.isAppliance) {
                    this.usersApplianceArray.push(elt)
                }
            }
            this.getUserNotAppliance(this.usersApplianceArray, idProjectActive)
        });
    }

    private getUserNotAppliance(usersApplianceArray: any, idProjectActive:number) {
        this.projectService.getById(idProjectActive).then(projectNotTerminate=> {

            if(projectNotTerminate.status!=this.STATUS_TERMINATE) {
                for(let elt of usersApplianceArray) {
                    this.userService.getById(elt.idDeveloper).then(user => {
                        if(user.role == this.ROLE_DEVELOPER && elt.idProject == projectNotTerminate.id) {
                            this.appliedDevelopers.push(user);
                            this.fillIdTechnologyDevelopers(user);
                        } else if(user.role == this.ROLE_SCRUM_MASTER && elt.idProject == projectNotTerminate.id) {
                            this.appliedScrumMasters.push(user);
                            this.fillIdTechnologyScrumMasters(user);
                        }
                    });
                }
            }
        });
    }

    accept(sosUser:SosUser) {
        let userProject:UserProject = {
            idDeveloper:0,
            idProject:0,
            isAppliance:true
        };
        this.developersProjectsService.updateDeveloperProjectIsAppliance(sosUser.id,this.idProjectActive,userProject).then(() => {
            // Passer le projet en projet actif
            let projectTmp:Project = {
                "name": "",
                "deadline": new Date(),
                "description": "",
                "repositoryUrl": "",
                "status": 0
            };
            projectTmp.status = this.STATUS_ACTIVE;
            projectTmp.id = this.idProjectActive;

            this.projectService.updateStatus(projectTmp).then(()=>{
            });
        });
    }
    refuse(sosUser:SosUser) {
        this.developersProjectsService.deleteDeveloperProjectByidDeveloperByidProject(sosUser.id,this.idProjectActive).then(() => {

        });
    }

    toggleButtonPress(isPressed:boolean) {
        this.buttonIsPressed = isPressed;
    }



}
