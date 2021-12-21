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

@Component({
    selector: 'app-create-sprint',
    templateUrl: './create-sprint.component.html',
    styleUrls: ['../../../app.component.css', './create-sprint.component.css']
})
export class CreateSprintComponent implements OnInit, OnDestroy {
    private subscription: Subscription | undefined;

    title: string = "Create sprint";
    selectedUserStory: string | undefined;
    chosenUserStories: string[] = [];
    buttonIsPressed: boolean = false;
    projectName: string | null = "";
    private idProject: number = 0;

    form:FormGroup = this.fb.group({
        main: this.fb.group({
            deadline:this.fb.control('', Validators.required),
            description:this.fb.control('', Validators.required)
        })
    });

    productBacklog: string[] = [];

    constructor(private fb: FormBuilder,
                private route: ActivatedRoute,
                private projectService: ProjectsService,
                private userStoryService: UserStoriesService,
                private sprintService: SprintsService) { }

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

    assignToSelected(selected:string) {
        this.selectedUserStory = selected;
    }

    getChosenUserStories() {
        const main = this.form.get(`UserStory`) as FormGroup;
        for (let i = 0 ; i < this.chosenUserStories.length ; i++) {
            main.addControl("US" + i, this.fb.control(this.chosenUserStories[i], Validators.required))
        }
    }

    sendData() {
        let maxSprintNumber: number = 0;
        this.subscription = this.sprintService.getMaxNumberOfSprints(this.idProject)
            .subscribe(result => maxSprintNumber = result);

        let rawValues = this.form.getRawValue().main;
        let sprint: Sprint = {
            idProject: this.idProject,
            sprintNumber: maxSprintNumber,
            startDate: new Date(),
            description: rawValues.description,
            deadline: rawValues.deadline
        };
        this.getChosenUserStories();
        console.log(this.form.value);
        console.log(sprint);
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
                this.productBacklog.push("US" + userStory.priority + " : " + userStory.description);
            }
        });
    }
}
