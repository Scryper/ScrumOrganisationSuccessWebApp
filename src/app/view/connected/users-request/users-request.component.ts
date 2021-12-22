import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {SosUser} from "../../../domain/sos-user";
import {UsersProjectsService} from "../../../services/users-projects/users-projects.service";
import {Project} from "../../../domain/project";
import {ProjectsService} from "../../../services/projects/projects.service";
import {UserService} from "../../../services";
import {UsersTechnologiesService} from "../../../services/users-technologies/users-technologies.service";
import {TechnologiesService} from "../../../services/technologies/technologies.service";
import {UserProject} from "../../../domain/user-project";
import {map} from "rxjs/operators";
import {Subscription} from "rxjs";
import {Role} from "../../../domain/role";

interface idUserTechno {
    idUser:number,
    Technology:string
}

@Component({
  selector: 'app-users-request',
  templateUrl: './users-request.component.html',
  styleUrls: ['../../../app.component.css', './users-request.component.css']
})

export class UsersRequestComponent implements OnInit, OnDestroy {
    private subscription: Subscription | undefined;

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

    idUsersWorksArray:number[] = [];

    usersWorksArray:SosUser[] = []

    activeProjects:Project = null!;

    TechnologyDevelopers:idUserTechno[] = [];
    TechnologyScrumMasters:idUserTechno[] = [];

    isScrumMasterEmpty:boolean = true;

    acceptTxt:string = "Accept";


    constructor(private route: ActivatedRoute,
                private usersProjectsService: UsersProjectsService,
                private projectService: ProjectsService,
                private userService: UserService,
                private usersTechnologiesService: UsersTechnologiesService,
                private technologiesService: TechnologiesService) { }

    ngOnDestroy(): void {
        this.subscription?.unsubscribe();
    }

    ngOnInit(): void {
        this.isScrumMasterEmpty = true;
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



    fillIdTechnologyDevelopers(user:SosUser){
        if (user.id != null) {
            this.subscription = this.usersTechnologiesService.getByUserId(user.id)
                .pipe(
                    map(DevTechnoArray => {
                        for (let DevTechno of DevTechnoArray) {
                            this.technologiesService.getById(DevTechno.idTechnology).subscribe(techno => {
                                this.TechnologyDevelopers.push({idUser: DevTechno.idUser, Technology: techno.name});
                            });
                        }
                    })
                ).subscribe();
        }
    }

    fillIdTechnologyScrumMasters(user:SosUser){
        if (user.id != null) {
            this.subscription = this.usersTechnologiesService.getByUserId(user.id)
                .pipe(
                    map(SMTechnoArray => {
                            for (let SMTechno of SMTechnoArray) {
                                this.technologiesService.getById(SMTechno.idTechnology).subscribe(techno => {
                                    this.TechnologyScrumMasters.push({idUser: SMTechno.idUser, Technology: techno.name});
                                });
                            }
                        }
                    )
                ).subscribe();
        }
    }


    private fillUsersRequest() {
        let tmpUser = JSON.parse(<string>localStorage.getItem('currentUser'));
        this.getDevelopersProjectsByIdDeveloperIsAppliance(tmpUser);
    }

    private getDevelopersProjectsByIdDeveloperIsAppliance(tmpUser:any) {

        // Get tous projet de l'user
        this.subscription = this.usersProjectsService.getByIdDeveloper(tmpUser.id)
            .pipe(
                map(tmp =>{

                    for(let elt of tmp) {
                            this.idProjectActive = elt.idProject;
                            this.getAllUsersByIdProject(this.idProjectActive)
                    }
                })
            ).subscribe();
    }

    private getAllUsersByIdProject(idProjectActive: number) {
        this.subscription = this.usersProjectsService.getUsersByIdProject(idProjectActive)
            .pipe(
                map(tmp=> {

                    for(let elt of Object.values(tmp)) {
                        if(elt.isAppliance) {
                            this.usersApplianceArray.push(elt)
                        } else {
                            this.idUsersWorksArray.push(elt.idDeveloper);
                        }
                    }
                    this.getUserNotAppliance(this.usersApplianceArray, idProjectActive);
                })
            ).subscribe();
    }

    private getUserNotAppliance(usersApplianceArray: any, idProjectActive:number) {
        this.subscription = this.projectService.getById(idProjectActive)
            .pipe(
                map(projectNotTerminate=> {
                    if(projectNotTerminate.status!=this.STATUS_TERMINATE) {
                        for(let elt of usersApplianceArray) {
                            this.userService.getById(elt.idDeveloper).subscribe(user => {
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
                })
            ).subscribe();
    }

    accept(sosUser:SosUser) {
        this.subscription = this.usersProjectsService.getScrumMasterByIdProject(this.idProjectActive)
            .pipe(
                map(tmp => {
                        for (let elt of Object.values(tmp)) {
                            if(!elt.isAppliance) {
                                this.isScrumMasterEmpty = false;
                            }
                        }

                        if(sosUser.role == Role.ScrumMaster && !this.isScrumMasterEmpty) {
                            this.acceptTxt = "Scrum already chosen";
                            return;
                        }
                        this.acceptTxt = "Accept";
                        let userProject:UserProject = {
                            idDeveloper:0,
                            idProject:0,
                            isAppliance:false
                        };

                        this.subscription = this.usersProjectsService.updateDeveloperProjectIsAppliance(sosUser.id,this.idProjectActive,userProject)
                            .pipe(
                                map(() => {
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

                                    this.projectService.updateStatus(projectTmp).subscribe();
                                    this.deleteUserFromList(sosUser);
                                })
                            ).subscribe();

                    }
                )
            ).subscribe();
    }

    refuse(sosUser:SosUser) {
        this.subscription = this.usersProjectsService.deleteDeveloperProjectByidDeveloperByidProject(sosUser.id,this.idProjectActive).subscribe();
        this.deleteUserFromList(sosUser);
    }

    toggleButtonPress(isPressed:boolean) {
        this.buttonIsPressed = isPressed;
    }

    private deleteUserFromList(user: SosUser) {
        if(user.role == Role.ScrumMaster) {
            this.appliedScrumMasters = this.appliedScrumMasters.filter(element => {
                return element.id != user.id;
            });
        } else {
            this.appliedScrumMasters = this.appliedDevelopers.filter(element => {
                return element.id != user.id;
            });
        }
    }
}
