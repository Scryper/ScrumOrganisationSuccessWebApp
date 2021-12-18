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
        this.projectService.getAll().then(tmpProjects => {
            this.projects = tmpProjects;
            this.loadProjectNames();
            this.isApply();
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
        this.developersProjectsService.addDeveloperProject(devProject).then(() => {
            // change the appliance's value to avoid making multiple requests for the same project
            for(let i = 0 ; i < this.projects.length ; i++){
                if(this.projects[i].id == project.id){
                    this.projectsIsApply[i] = true;
                }
            }
        });
    }

    private loadProjectNames() {
        this.projectsName = [];
        for (let elt of this.projects) {
            this.projectsName.push(elt.name);
        }
    }

    private isAssigned() {
        this.developersProjectsService.getByIdDeveloperIsAppliance(this.userId).then(tmp => {
            this.unassigned = tmp.length != 0;
        });
    }

    //allows to know if the project has already had a appliance of this user
    isApply() {
        for(let i = 0 ; i< this.projects.length ; i++){
            this.developersProjectsService.getByIdDeveloperIdProject(this.userId, this.projects[i].id!).then(tmp => {
                this.projectsIsApply[i] = tmp != null;
            });
        }
    }
}
