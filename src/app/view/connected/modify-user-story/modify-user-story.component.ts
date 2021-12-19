import { Component, OnInit } from '@angular/core';
import {SosUser} from "../../../domain/sos-user";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {ProjectsService} from "../../../services/projects/projects.service";
import {DevelopersProjectsService} from "../../../services/developers-projects/developers-projects.service";
import {UserStoriesService} from "../../../services/user-stories/user-stories.service";
import {UserStory} from "../../../domain/user-story";

@Component({
  selector: 'app-modify-user-story',
  templateUrl: './modify-user-story.component.html',
  styleUrls: ['../../../app.component.css', './modify-user-story.component.css']
})
export class ModifyUserStoryComponent implements OnInit {


    buttonIsPressed: boolean = false;
    title: string = "Modify User Story";
    projectName: string | null = "";
    idProject: number = 0;

    idUserStory: number = 0;

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
        this.idUserStory = Number(this.route.snapshot.paramMap.get("idUserStory"));

        this.userStoriesService.getById(this.idUserStory).then(tmp=>{
            this.form.controls['main'].setValue({
                name: tmp.name,
                description: tmp.description,
                priority: tmp.priority
            });
        })

        this.currentUser = <SosUser>JSON.parse(<string>localStorage.getItem('currentUser'));
        this.userId = (this.currentUser.id==undefined)?0:this.currentUser.id;
    }

    sendData() {

        // Modifier une userStory
        //create project
        let tmpUserStory: UserStory = {
            idProject: <number>this.idProject,
            name: this.form.getRawValue().main.name,
            description: this.form.getRawValue().main.description,
            priority: <number>this.form.getRawValue().main.priority,
            id:<number>this.idUserStory
        }

        //add UserStory in the database
        this.userStoriesService.updateUserStory(tmpUserStory).then(tmp=>{
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
