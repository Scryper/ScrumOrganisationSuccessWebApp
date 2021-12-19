import { Component, OnInit } from '@angular/core';
import {SosUser} from "../../../domain/sos-user";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ProjectsService} from "../../../services/projects/projects.service";
import {DevelopersProjectsService} from "../../../services/developers-projects/developers-projects.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Project} from "../../../domain/project";
import {DeveloperProject} from "../../../domain/developer-project";
import {DatePipe} from "@angular/common";
import {UserStory} from "../../../domain/user-story";
import {UserStoriesService} from "../../../services/user-stories/user-stories.service";

@Component({
  selector: 'app-create-user-story',
  templateUrl: './create-user-story.component.html',
  styleUrls: ['../../../app.component.css', './create-user-story.component.css']
})
export class CreateUserStoryComponent implements OnInit {

    buttonIsPressed: boolean = false;
    title: string = "Create User Story";
    projectName: string | null = "";
    idProject: number = 0;

    currentUser: SosUser = null!;
    userId: number = 0;

    form:FormGroup = this.fb.group({
        main: this.fb.group({
            name:this.fb.control('', Validators.required),
            description:this.fb.control('', Validators.required),
            priority:this.fb.control('', Validators.required)
        })
    });

    constructor(private route: ActivatedRoute,
                private fb: FormBuilder,
                private projectService : ProjectsService,
                private developersProjectsService : DevelopersProjectsService,
                private userStoriesService:UserStoriesService,
                private router : Router) { }

    ngOnInit(): void {
        this.projectName = this.route.snapshot.paramMap.get("projectName");
        this.idProject = Number(this.route.snapshot.paramMap.get("idProject"));
        this.currentUser = <SosUser>JSON.parse(<string>localStorage.getItem('currentUser'));
        this.userId = (this.currentUser.id==undefined)?0:this.currentUser.id;
    }

    sendData() {
        //create project
        let tmpUserStory: UserStory = {
            idProject: <number>this.idProject,
            name: this.form.getRawValue().main.name,
            description: this.form.getRawValue().main.description,
            priority: <number>this.form.getRawValue().main.priority
        }

        //add UserStory in the database
        this.userStoriesService.addUserStory(tmpUserStory).then(tmp=>{
            //redirect to projects
            let returnUrl: string = 'productBacklog/'+this.projectName+'/'+this.idProject;
            this.router.navigate([returnUrl]);
        })
    }

    toggleButtonPress(isPressed:boolean) {
        this.buttonIsPressed = isPressed;
    }

    autoComplete() {
        this.form.setValue({
            main: {
                name: "Your userStory name.",
                description: "Your userStory description.",
                priority: 1
            }
        });
    }

}
