import { Component, OnInit } from '@angular/core';
import { Sprint} from "../../../domain/sprint";
import { SprintsService } from "../../../services/sprints/sprints.service";
import { ActivatedRoute } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { UserStory } from "../../../domain/user-story";
import { SprintsUserStoriesService } from "../../../services/sprints-user-stories/sprints-user-stories.service";
import { SprintUserStory } from "../../../domain/sprint-user-story";
import {UserStoriesService} from "../../../services/user-stories/user-stories.service";

@Component({
    selector: 'app-modify-sprint',
    templateUrl: './modify-sprint.component.html',
    styleUrls: ['../../../app.component.css', './modify-sprint.component.css']
})
export class ModifySprintComponent implements OnInit {
    isButtonPressed: boolean = false;
    isInSprint: boolean[] = [];

    idSprint: number = 0;
    idsUserStories: number[] = [];

    sprint: Sprint = {
        id: 0,
        description: "",
        deadline: new Date(),
        startDate: new Date(),
        sprintNumber: 0,
        idProject: 0
    };

    userStories: UserStory[] = [];

    form: FormGroup = this.fb.group({
        newDeadline: this.fb.group({
            deadline: this.fb.control('', Validators.required)
        }),
        newMeeting: this.fb.group({
            schedule: this.fb.control('', Validators.required),
            description: this.fb.control('', Validators.required)
        })
    });

    constructor(private fb: FormBuilder,
                private sprintService: SprintsService,
                private route: ActivatedRoute,
                private sprintUserStoryService: SprintsUserStoriesService,
                private userStoryService: UserStoriesService) { }

    ngOnInit(): void {
        this.loadSprint();
    }

    private loadSprint() {
        let idSprintAsString: string | null = this.route.snapshot.paramMap.get("sprintId");
        if (typeof idSprintAsString === "string") {
            this.idSprint = parseInt(idSprintAsString, 10); // cast to int because params are string by default
        }
        this.sprintService.getById(this.idSprint).then(sprint => {
            if(sprint != undefined) { // security
                this.sprint = sprint;
                this.fillIdsUserStories(this.sprint.idProject);
            }
        });
    }

    onSubmit() {

    }

    toggleButtonPressed(isPressed: boolean) {
        this.isButtonPressed = isPressed;
    }

    doDeleteOrAddUserStory(event:any, elt: UserStory) {
        if(event.target.checked) {
            this.addUserStory(elt.id);
        } else {
            this.deleteUserStory(elt.id);
        }
    }

    addUserStory(idUserStory: number) {
        let sprintUserStory: SprintUserStory = {
            idSprint: this.sprint.id,
            idUserStory: idUserStory
        };
        this.sprintUserStoryService.addSprintUserStory(sprintUserStory);
    }

    deleteUserStory(idUserStory: number) {
        this.sprintUserStoryService.deleteSprintUserStory(this.sprint.id, idUserStory);
    }

    private fillIdsUserStories(idProject: number) {
        // get all user stories from the project
        this.getNameOfUserStories(idProject);
    }

    private getNameOfUserStories(idProject: number) {
        this.userStoryService.getByIdProject(idProject).then(userStories => {
            for (let userStory of userStories) {
                this.idsUserStories.push(userStory.id);
            }
        });
    }
}
