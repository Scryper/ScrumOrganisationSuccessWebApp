import {Component, OnDestroy, OnInit} from '@angular/core';
import { Project} from "../../../domain/project";
import { AuthenticationService } from "../../../services";
import { UsersProjectsService } from "../../../services/developers-projects/users-projects.service";
import { ProjectsService } from "../../../services/projects/projects.service";
import { SosUser } from "../../../domain/sos-user";
import { UserProject } from "../../../domain/user-project";
import {Subscription} from "rxjs";
import {map} from "rxjs/operators";

@Component({
    selector: 'app-join-project',
    templateUrl: './join-project.component.html',
    styleUrls: ['../../../app.component.css', './join-project.component.css']
})
export class JoinProjectComponent implements OnInit, OnDestroy {
    private STATUS_FINISHED: number = 3;

    projects: Project[] = [];
    projectsName: string[] = [];
    projectsIsApply: boolean[] = [];

    assigned: boolean = false;
    currentUser: SosUser = null!;
    userId: number = 0;

    private subscription: Subscription | undefined;

    constructor(private authenticationService: AuthenticationService,
                private projectService: ProjectsService,
                private developersProjectsService : UsersProjectsService) { }

    ngOnDestroy(): void {
        this.subscription?.unsubscribe();
    }

    ngOnInit(): void {
        this.currentUser = <SosUser>JSON.parse(<string>localStorage.getItem('currentUser'));
        this.userId = (this.currentUser.id == undefined) ? 0 : this.currentUser.id;
        this.subscription = this.loadProjects()
            .pipe(map(() => {
                this.isAssigned()
            })
        ).subscribe();
    }

    private loadProjects() {
        return this.projectService.getAll().pipe(
            map(projects => {
                for(let project of projects) {
                    if(project.status != this.STATUS_FINISHED) {
                        this.projects.push(project);
                        this.projectsName.push(project.name);
                        this.isAppliance(project);
                    }
                }
            }
        ));
    }

    joinProject(project: Project) {
        //create developerProject
        let devProject:UserProject = {
            idDeveloper : this.userId,
            idProject : project.id!,
            isAppliance : true
        }
        // send request
        // this.developersProjectsService.addDeveloperProject(devProject).then(result => {
        //     if(result != null) {
        //         // change the appliance's value to avoid making multiple requests for the same project
        //         for(let i = 0 ; i < this.projects.length ; i++){
        //             if(this.projects[i].id == project.id){
        //                 this.projectsIsApply[i] = true;
        //             }
        //         }
        //     }
        // });
    }

    private isAssigned() {
        this.developersProjectsService.getByIdDeveloperIsAppliance(this.userId).subscribe(tmp => {
            this.assigned = tmp.length != 0;
        });
    }

    //allows to know if the project has already had a appliance of this user
    isAppliance(project: Project) {
        this.developersProjectsService.getByIdDeveloperIdProject(this.userId, project.id!).subscribe(developerProject => {
            this.projectsIsApply.push(developerProject != null);
        });
    }
}
