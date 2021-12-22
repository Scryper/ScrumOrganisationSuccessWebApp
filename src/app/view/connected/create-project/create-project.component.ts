import {Component, OnDestroy, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import {DatePipe} from "@angular/common";
import {ProjectsService} from "../../../services/projects/projects.service";
import {Project} from "../../../domain/project";
import {UserProject} from "../../../domain/user-project";
import {SosUser} from "../../../domain/sos-user";
import {UsersProjectsService} from "../../../services/users-projects/users-projects.service";
import {Router} from "@angular/router";
import {Subscription} from "rxjs";
import {map} from "rxjs/operators";

@Component({
    selector: 'app-create-project',
    templateUrl: './create-project.component.html',
    styleUrls: ['../../../app.component.css', './create-project.component.css']
})
export class CreateProjectComponent implements OnInit, OnDestroy {
    private subscription: Subscription | undefined;

    buttonIsPressed: boolean = false;
    title: string = "Create project";
    currentUser: SosUser = null!;
    userId: number = 0;
    returnUrl: string = 'projectManager';

    form:FormGroup = this.fb.group({
        main: this.fb.group({
            nameProject:this.fb.control('', Validators.required),
            deadline:this.fb.control('', Validators.required),
            description:this.fb.control('', Validators.required),
            repositoryURL:this.fb.control('', Validators.required)
        })
    });
    isBackButtonPressed: boolean = false;

    constructor(private fb: FormBuilder,
                private projectService : ProjectsService,
                private developersProjectsService : UsersProjectsService,
                private router : Router) { }

    ngOnDestroy(): void {
        this.subscription?.unsubscribe();
    }

    ngOnInit(): void {
        this.currentUser = <SosUser>JSON.parse(<string>localStorage.getItem('currentUser'));
        this.userId = (this.currentUser.id==undefined)?0:this.currentUser.id;
    }

    sendData() {
        //create project
        let projet: Project = {
            name: this.form.getRawValue().main.nameProject,
            deadline: this.form.getRawValue().main.deadline,
            description: this.form.getRawValue().main.description,
            repositoryUrl: this.form.getRawValue().main.repositoryURL,
            status: 1
        }

        //add project in the database
        this.subscription = this.projectService.addProject(projet)
            .pipe(
                map(project => {
                    //assigner le product owner to the project
                    let devProject:UserProject = {
                        idDeveloper : this.userId,
                        idProject : project.id!,
                        isAppliance : true
                    }
                    this.developersProjectsService.addDeveloperProject(devProject).pipe(
                        map(() => {
                            this.router.navigate([this.returnUrl]);
                        })
                    ).subscribe();
                    //redirect to projects
                })
            ).subscribe();
    }

    toggleButtonPress(isPressed:boolean) {
        this.buttonIsPressed = isPressed;
    }

    autoComplete() {
        let datePipe = new DatePipe('en-GB');
        let date = datePipe.transform(new Date(), 'yyyy-MM-dd');
        this.form.setValue({
            main: {
                nameProject: "Your project name.",
                deadline: date,
                description: "Your project description.",
                repositoryURL: "URL repository."
            }
        });
    }

    toggleBackButtonPress(isPressed: boolean) {
        this.isBackButtonPressed = isPressed;
    }
}
