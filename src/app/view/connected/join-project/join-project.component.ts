import { Component, OnInit } from '@angular/core';
import { Project} from "../../../domain/project";
import { AuthenticationService } from "../../../services";
import { UsersProjectsService } from "../../../services/developers-projects/users-projects.service";
import { ProjectsService } from "../../../services/projects/projects.service";
import { SosUser } from "../../../domain/sos-user";
import { UserProject } from "../../../domain/user-project";

@Component({
    selector: 'app-join-project',
    templateUrl: './join-project.component.html',
    styleUrls: ['../../../app.component.css', './join-project.component.css']
})
export class JoinProjectComponent implements OnInit {
    private STATUS_ACTIVE: number = 2;
    private STATUS_FINISHED: number = 3;

    projects: Project[] = [];
    projectsName: string[] = [];
    projectsIsApply: boolean[] = [];

    unassigned: boolean = false;
    isWorking: boolean = false;
    currentUser: SosUser = null!;
    userId: number = 0;

    constructor(private authenticationService: AuthenticationService,
                private projectService: ProjectsService,
                private developersProjectsService : UsersProjectsService) { }

    ngOnInit(): void {
        this.currentUser = <SosUser>JSON.parse(<string>localStorage.getItem('currentUser'));
        this.userId = (this.currentUser.id == undefined) ? 0 : this.currentUser.id;
        this.loadProjects();
        this.isAssigned();
        this.isUserWorking();
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
        let devProject:UserProject = {
            idDeveloper : this.userId,
            idProject : project.id!,
            isAppliance : false
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
                // UPDATE STATUS INACTIVE
                project.status = 1;
                this.projectService.updateStatus(project).then(()=>{
                });
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

    private isUserWorking() {
        this.developersProjectsService.getByIdDeveloper(this.userId).then(developerProjects => {
            let i: number = 0;
            let result: boolean = false;
            while(i < developerProjects.length && !result) {
                result = this.verifyIfUserWorks(developerProjects[i].idProject);
                this.isWorking = result;
                i++;
            }
        });
    }

    private verifyIfUserWorks(idProject: number): boolean {
        for(let project of this.projects) {
            if(project.id == idProject && project.status == this.STATUS_ACTIVE) {
                return true;
            }
        }
        return false;
    }
}
