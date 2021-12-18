import { Component, OnInit } from '@angular/core';
import { Project} from "../../../domain/project";
import { AuthenticationService } from "../../../services";
import { DevelopersProjectsService } from "../../../services/developers-projects/developers-projects.service";
import { ProjectsService } from "../../../services/projects/projects.service";
import { SosUser } from "../../../domain/sos-user";
import { DeveloperProject } from "../../../domain/developer-project";

@Component({
    selector: 'app-join-project',
    templateUrl: './join-project.component.html',
    styleUrls: ['../../../app.component.css', './join-project.component.css']
})
export class JoinProjectComponent implements OnInit {
    private STATUS_FINISHED: number = 3;

    projects: Project[] = [];
    projectsName: string[] = [];
    projectsIsApply: boolean[] = [];

    unassigned: boolean = false;
    currentUser: SosUser = null!;
    userId: number = 0;

    constructor(private authenticationService: AuthenticationService,
                private projectService: ProjectsService,
                private developersProjectsService : DevelopersProjectsService) { }

    ngOnInit(): void {
        this.currentUser = <SosUser>JSON.parse(<string>localStorage.getItem('currentUser'));
        this.userId = (this.currentUser.id == undefined) ? 0 : this.currentUser.id;
        this.loadProjects();
        this.isAssigned();
    }

    private loadProjects() {
        this.projectService.getAll().then(projects => {
            for (let i = 0 ; i < projects.length ; i++) {
                let project: Project = projects[i];
                if(project.status != this.STATUS_FINISHED) {
                    this.projects.push(project);
                    this.projectsName.push(project.name);
                    this.isAppliance(project);
                }
            }
        });
    }

    joinProject(project: Project) {
        //create developerProject
        let devProject:DeveloperProject = {
            idDeveloper : this.userId,
            idProject : project.id!,
            isAppliance : true
        }
        // send request
        this.developersProjectsService.addDeveloperProject(devProject).then(result => {
            if(result != null) {
                // change the appliance's value to avoid making multiple requests for the same project
                for(let i = 0 ; i < this.projects.length ; i++){
                    if(this.projects[i].id == project.id){
                        this.projectsIsApply[i] = true;
                    }
                }
            }
        });
    }

    private isAssigned() {
        this.developersProjectsService.getByIdDeveloperIsAppliance(this.userId).then(tmp => {
            this.unassigned = tmp.length != 0;
        });
    }

    //allows to know if the project has already had a appliance of this user
    isAppliance(project: Project) {
        this.developersProjectsService.getByIdDeveloperIdProject(this.userId, project.id!).then(developerProject => {
            this.projectsIsApply.push(developerProject != null);
        });
    }
}
