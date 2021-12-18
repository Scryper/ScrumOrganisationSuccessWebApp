import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserStory} from "../../../domain/user-story";
import {ActivatedRoute} from "@angular/router";
import {ProjectsService} from "../../../services/projects/projects.service";
import {UserStoriesService} from "../../../services/user-stories/user-stories.service";

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

    productBacklog = [
        "US 1 - Move Player",
        "US 2 - Fight Player",
        "US 3 - Defend Player",
        "US 4 - Special attack"
    ];

    constructor(private fb: FormBuilder,
                private route: ActivatedRoute,
                private projectService: ProjectsService,
                private userStoryService: UserStoriesService) { }

    ngOnInit(): void {
        this.projectName = this.route.snapshot.paramMap.get("projectName");
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
}
