import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserStory} from "../../../domain/user-story";
import {ActivatedRoute} from "@angular/router";
import {ProjectsService} from "../../../services/projects/projects.service";
import {UserStoriesService} from "../../../services/user-stories/user-stories.service";
import {DatePipe} from "@angular/common";

@Component({
    selector: 'app-create-sprint',
    templateUrl: './create-sprint.component.html',
    styleUrls: ['../../../app.component.css', './create-sprint.component.css']
})
export class CreateSprintComponent implements OnInit {
    title: string = "Create sprint";
    selectedUserStory: string | undefined;
    ChosenUserStories: string[] = [];
    buttonIsPressed: boolean = false;
    projectName: string | null = "";

    form:FormGroup = this.fb.group({
        main: this.fb.group({
            deadline:this.fb.control('', Validators.required),
            description:this.fb.control('', Validators.required)
        }),
        UserStory: this.fb.group({
        })
    });

    productBacklog:string[] = [];

    constructor(private fb: FormBuilder,
                private route: ActivatedRoute,
                private projectService: ProjectsService,
                private userStoryService: UserStoriesService) { }

    ngOnInit(): void {
        this.projectName = this.route.snapshot.paramMap.get("projectName");
        this.loadProductBacklog();
    }

    addToChosenUserStories() {
        if (this.selectedUserStory != null && !this.ChosenUserStories.includes(this.selectedUserStory)) {
            this.ChosenUserStories.push(this.selectedUserStory);
        }
    }

    assignToSelected(selected:string) {
        this.selectedUserStory = selected;
    }

    addChosenUserStoriesToForm() {
        const main = this.form.get(`UserStory`) as FormGroup;
        let i = 0;
        for(let elt of this.ChosenUserStories) {
            i++;
            main.addControl("US"+i, this.fb.control(elt, Validators.required))
        }
    }

    sendData() {
        this.addChosenUserStoriesToForm();
        console.log(this.form.value);
    }

    toggleButtonPress(isPressed:boolean) {
        this.buttonIsPressed = isPressed;
    }

    private loadProductBacklog() {
        this.getProject();
    }

    private getProject() {
        this.projectService.getByProjectName(this.projectName).then(project => {
            if (project.id != null) {
                this.getUserStories(project.id);
            }
        });
    }

    private getUserStories(id: number) {
        this.userStoryService.getByIdProject(id).then(userStories => {
            for (let i = 0 ; i < userStories.length ; i++) {
                let userStory: UserStory = userStories[i];
                this.productBacklog.push("US" + userStory.priority + " : " + userStory.description);
            }
        });
    }

    autoComplete() {
        /*let datePipe = new DatePipe('en-GB');
        let date = datePipe.transform(new Date(), 'yyyy-MM-dd');

        this.form.setValue({
            main: this.fb.group({
                deadline:date,
                description:"Description du sprint"
            }),
            UserStory: this.fb.group({
            })
        });*/

    }
}
