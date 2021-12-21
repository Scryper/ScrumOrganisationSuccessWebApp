import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {SosUser} from "../../../domain/sos-user";
import {UsersProjectsService} from "../../../services/developers-projects/users-projects.service";
import {Project} from "../../../domain/project";
import {ProjectsService} from "../../../services/projects/projects.service";
import {UserService} from "../../../services";
import {DevelopersTechnologiesService} from "../../../services/developers-technologies/developers-technologies.service";
import {TechnologiesService} from "../../../services/technologies/technologies.service";

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

    nameProject: string | null = "";
    buttonIsPressed: boolean = false;
    clicked: any;

    currentUser:SosUser = null!;

    idAppliedDevelopers:number[] = []
    idAppliedScrumMasters:number[] = []

    appliedDevelopers:SosUser[] = []
    appliedScrumMasters:SosUser[] = []

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

    fillIdTechnologyDevelopers(){
        for(let id of this.idAppliedDevelopers) {
            this.developersTechnologiesService.getByDeveloperId(id).then(DevTechnoArray =>{
                for(let DevTechno of DevTechnoArray) {
                    this.technologiesService.getById(DevTechno.idTechnology).then(techno =>{
                        this.TechnologyDevelopers.push({idUser:DevTechno.idUser,Technology:techno.name});
                    });
                }
            });
        }
    }

    fillIdTechnologyScrumMasters(){
        for(let id of this.idAppliedScrumMasters) {
            this.developersTechnologiesService.getByDeveloperId(id).then(SMTechnoArray =>{
                for(let SMTechno of SMTechnoArray) {
                    this.technologiesService.getById(SMTechno.idTechnology).then(techno =>{
                        this.TechnologyScrumMasters.push({idUser:SMTechno.idUser,Technology:techno.name});
                    });
                }
            });
        }
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
        let idProjectActive:number;
        this.developersProjectsService.getByIdDeveloper(tmpUser.id).then(tmp =>{
      
            for(let elt of tmp) {
                if(elt.isAppliance) {
                    idProjectActive = elt.idProject;

                    this.getAllProjectService(idProjectActive,tmpUser);
                }
            }
        });
    }
    private getAllProjectService(idProjectActive:any,tmpUser:any) {
        // GET ALL project
        this.projectService.getAll().then(projects=>{

            this.allProjects = projects;
            for (let elt of this.allProjects) {
                if(elt.status == this.STATUS_ACTIVE && elt.id == idProjectActive) {
                    console.log(elt);
                    this.activeProjects = elt;
                }
            }
            this.getDevelopersProjectsByIdProject();
        });
    }
    private getDevelopersProjectsByIdProject() {
        // GET ALL DEVS by id project
        this.developersProjectsService.getDevelopersByIdProject(this.activeProjects.id).then(tmp => {

            for(let elt of Object.values(tmp)) {
                this.idAppliedDevelopers.push(elt.idDeveloper);
            }
            for(let elt2 of this.idAppliedDevelopers) {
                this.userService.getById(elt2).then(tmp => {
                    this.appliedDevelopers.push(tmp);
                });
            }
            this.getDevelopersProjectsScrumMasterByIdProject();
        });
    }
    private getDevelopersProjectsScrumMasterByIdProject() {

        // GET ALL SCRUM_MASTER by id project
        this.developersProjectsService.getScrumMasterByIdProject(this.activeProjects.id).then(tmp => {

            for(let elt of Object.values(tmp)) {
                this.idAppliedScrumMasters.push(elt.idDeveloper);
            }
            for(let elt2 of this.idAppliedScrumMasters) {
                this.userService.getById(elt2).then(tmp => {
                    this.appliedScrumMasters.push(tmp);
                });
            }
            this.fillIdTechnologyDevelopers();
            this.fillIdTechnologyScrumMasters();
        });
    }

    accept(sosUser:SosUser) {
        console.log(sosUser);
    }
    refuse(sosUser:SosUser) {
        /*this.developersProjectsService.deleteDeveloperProjectByidDeveloperByidProject(sosUser.id,this.activeProjects.id).then(tmp => {

        });*/
    }

    toggleButtonPress(isPressed:boolean) {
        this.buttonIsPressed = isPressed;
    }

}
