import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { UserStory } from "../../../domain/user-story";
import { ActivatedRoute } from "@angular/router";
import { ProjectsService } from "../../../services/projects/projects.service";
import { UserStoriesService } from "../../../services/user-stories/user-stories.service";
import { Subscription } from "rxjs";
import { map } from "rxjs/operators";
import { Sprint } from "../../../domain/sprint";
import { SprintsService } from "../../../services/sprints/sprints.service";
import {SprintsUserStoriesService} from "../../../services/sprints-user-stories/sprints-user-stories.service";
import {SprintUserStory} from "../../../domain/sprint-user-story";import {DatePipe} from "@angular/common";

@Component({
    selector: 'app-create-sprint',
    templateUrl: './create-sprint.component.html',
    styleUrls: ['../../../app.component.css', './create-sprint.component.css']
})
export class CreateSprintComponent implements OnInit, OnDestroy {
    private subscription: Subscription | undefined;
    private idProject: number = 0;

    title: string = "Create sprint";
    selectedUserStory: UserStory | undefined;
    chosenUserStories: UserStory[] = [];
    buttonIsPressed: boolean = false;
    projectName: string | null = "";

    form:FormGroup = this.fb.group({
        main: this.fb.group({
            deadline:this.fb.control('', Validators.required),
            description:this.fb.control('', Validators.required)
        })
    });

    productBacklog: UserStory[] = [];

    constructor(private fb: FormBuilder,
                private route: ActivatedRoute,
                private projectService: ProjectsService,
                private userStoryService: UserStoriesService,
                private sprintService: SprintsService,
                private sprintUserStoryService: SprintsUserStoriesService) { }

    ngOnDestroy(): void {
        this.subscription?.unsubscribe();
    }

    ngOnInit(): void {
        this.projectName = this.route.snapshot.paramMap.get("projectName");
        this.loadProductBacklog();
    }

    addToChosenUserStories() {
        if (this.selectedUserStory != null && !this.chosenUserStories.includes(this.selectedUserStory)) {
            this.chosenUserStories.push(this.selectedUserStory);
        }
    }

    assignToSelected(selected: string) {
        for (let userStory of this.productBacklog) {
            if(userStory.name == selected) {
                this.selectedUserStory = userStory
            }
        }
    }

    sendData() {
        this.subscription = this.sprintService.getMaxNumberOfSprints(this.idProject)
            .pipe(
                map(result => {
                    let rawValues = this.form.getRawValue().main;
                    let sprint: Sprint = {
                        idProject: this.idProject,
                        sprintNumber: result + 1, // result is the max number of sprints already present in the database
                        startDate: new Date(),
                        description: rawValues.description,
                        deadline: new Date(rawValues.deadline)
                    };
                    this.addSprint(sprint);
                })
            ).subscribe();
    }

    toggleButtonPress(isPressed:boolean) {
        this.buttonIsPressed = isPressed;
    }

    private loadProductBacklog() {
        this.subscription = this.getProject().subscribe();
    }

    private getProject() {
        return this.projectService.getByProjectName(this.projectName).pipe(
            map(project => {
                if (project.id != null) {
                    this.idProject = project.id;
                    this.getUserStories(project.id);
                }
            }
        ));
    }

    private getUserStories(id: number) {
        this.userStoryService.getByIdProject(id).subscribe(userStories => {
            for (let i = 0 ; i < userStories.length ; i++) {
                let userStory: UserStory = userStories[i];
                this.productBacklog.push(userStory);
            }
        });
    }

    private addSprint(sprint: Sprint) {
        this.subscription = this.sprintService.addSprint(sprint).pipe(
            map(sprintResult => {
                for (let userStory of this.chosenUserStories) {
                    let sprintUserStory: SprintUserStory = {
                        idSprint: sprintResult.id,
                        idUserStory: userStory.id
                    };
                    this.sprintUserStoryService.addSprintUserStory(sprintUserStory).subscribe();
                }
            })
        ).subscribe();
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
