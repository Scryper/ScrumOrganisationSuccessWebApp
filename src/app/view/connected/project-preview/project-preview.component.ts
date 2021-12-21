import {Component, OnDestroy, OnInit} from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { ProjectsService } from "../../../services/projects/projects.service";
import { DatePipe } from "@angular/common";
import { UsersProjectsService } from "../../../services/developers-projects/users-projects.service";
import { SosUser } from "../../../domain/sos-user";
import {UserProject} from "../../../domain/user-project";
import {map} from "rxjs/operators";
import {Subscription} from "rxjs";

@Component({
    selector: 'app-project-preview',
    templateUrl: './project-preview.component.html',
    styleUrls: ['../../../app.component.css', './project-preview.component.css']
})
export class ProjectPreviewComponent implements OnInit, OnDestroy {
    isButtonPressed: boolean = false;
    assigned: boolean = false;

    userId: number = 0;
    projectId: number = 0;

    projectName: string | null = "";
    deadline: string | null  = "";
    description: string = "";

    datePipe = new DatePipe('en-GB');
    DATE_FORMAT: string = 'dd/MM/yyyy';
    currentUser: SosUser | undefined;

    private subscription: Subscription | undefined;

    constructor(private route: ActivatedRoute,
                private projectService: ProjectsService,
                private developersProjectsService: UsersProjectsService) { }

    ngOnDestroy(): void {
        this.subscription?.unsubscribe();
    }

    ngOnInit(): void {
        this.currentUser = <SosUser>JSON.parse(<string>localStorage.getItem('currentUser'));
        this.userId = (this.currentUser.id == undefined) ? 0 : this.currentUser.id;
        this.projectName = this.route.snapshot.paramMap.get("projectName");
        this.loadProjectInfo();
    }

    private loadProjectInfo() {
        this.subscription = this.getProject().subscribe();
    }

    private getProject() {
        return this.projectService.getByProjectName(this.projectName).pipe(
            map((project => {
                this.deadline = this.datePipe.transform(project.deadline, this.DATE_FORMAT);
                this.description = project.description;
                if (project.id != null) {
                    this.projectId = project.id;
                }
                //this.isApply();
            })
        ));
    }

    isApply() {
        // this.developersProjectsService.getByIdDeveloperIdProject(this.userId, this.projectId).then(developerProject => {
        //     this.unassigned = developerProject != null;
        // });
    }

    toggleButtonPress(isPressed: boolean) {
        this.isButtonPressed = isPressed;
    }

    requestToJoin() {
        let appliance: UserProject = {
            idDeveloper: this.userId,
            idProject: this.projectId,
            isAppliance: true
        };
        // this.developersProjectsService.addDeveloperProject(appliance).then(result => {
        //     if(result != null) {
        //         this.unassigned = !this.unassigned;
        //     }
        // });
    }
}
