import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {AuthenticationService} from "../../../services";
import {ProjectsService} from "../../../services/projects/projects.service";
import {DatePipe} from "@angular/common";
import {SprintsService} from "../../../services/sprints/sprints.service";
import {Sprint} from "../../../domain/sprint";
import {UserStoriesService} from "../../../services/user-stories/user-stories.service";
import {SprintsUserStoriesService} from "../../../services/sprints-user-stories/sprints-user-stories.service";

@Component({
    selector: 'app-my-project',
    templateUrl: './my-project.component.html',
    styleUrls: ['../../../app.component.css', './my-project.component.css']
})
export class MyProjectComponent implements OnInit {
    buttonIsPressed: boolean = false;
    isProductOwner: boolean = false;
    clicked: any;
    idProject: number = 0;
    projectName: string | null = "";
    deadline: string | null = "";
    description: string = "";
    repositoryUrl: string = "";
    datePipe = new DatePipe('en-GB');
    DATE_FORMAT: string = 'dd/MM/yyyy';

    actualSprint: ZippedSprint = {
        id: 0,
        name: "",
        US: []
    };

    oldSprints: ZippedSprint[] = [];

    constructor(private route: ActivatedRoute,
                private authenticationService: AuthenticationService,
                private projectService: ProjectsService,
                private sprintService: SprintsService,
                private sprintUserStoryService: SprintsUserStoriesService,
                private userStoryService: UserStoriesService) { }

    ngOnInit(): void {
        this.projectName = this.route.snapshot.paramMap.get("projectName");
        this.loadProjectInfo();
    }

    toggleButtonPress(isPressed:boolean) {
        this.buttonIsPressed = isPressed;
    }

    private loadProjectInfo() {
        this.getProject();
    }

    private getProject() {
        this.projectService.getByProjectName(this.projectName).then(project => {
            this.deadline = this.datePipe.transform(project.deadline, this.DATE_FORMAT);
            this.description = project.description;
            this.repositoryUrl = project.repositoryUrl;
            this.idProject = project.id;
            this.getSprints(this.idProject);
        });
    }

    private getSprints(idProject: number) {
        this.sprintService.getByIdProject(idProject).then(sprints => {
            for(let i = 0 ; i < sprints.length ; i++) {
                let sprint: Sprint = sprints[i];
                let idSprint: number = sprint.id;
                // save the dates as dates elements:
                // Angular date object and sql server date object are not the same
                // so this "cast" is necessary
                // then getting the value of the date to compare dates
                let todayAsTime: number = new Date().getTime();
                let startAsTime: number = new Date(sprint.startDate).getTime();
                let deadlineAsTime: number = new Date(sprint.deadline).getTime();

                // a sprint is active if today's date is between the start and end of the sprint
                if(startAsTime <= todayAsTime && todayAsTime <= deadlineAsTime) {
                    this.actualSprint = {id: sprint.id, name: sprint.description, US: []};
                } else {
                    this.oldSprints.push({id: sprint.id, name: sprint.description, US: []});
                }

                // get the links to user stories about this
                this.getLinksSprintsUserStories(idSprint);
            }
        });
    }

    private getLinksSprintsUserStories(idSprint: number): void {
        this.sprintUserStoryService.getByIdSprint(idSprint).then(sprintsUserStories => {
            for (let i = 0 ; i < sprintsUserStories.length ; i++) {
                let idUserStory: number = sprintsUserStories[i].idUserStory;
                this.getUserStory(idUserStory, i);
            }
        });
    }

    private getUserStory(idUserStory: number, index: number) {
        this.userStoryService.getById(idUserStory).then(userStory => {
            this.oldSprints[index].US.push("US" + userStory.priority + " : " + userStory.description);
        });
    }
}

export interface ZippedSprint {
    id: number;
    name: string;
    US: string[];
}
