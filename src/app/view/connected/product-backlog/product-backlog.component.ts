import { Component, OnInit } from '@angular/core';
import {UserStoriesService} from "../../../services/user-stories/user-stories.service";
import {ActivatedRoute} from "@angular/router";
import {ProjectsService} from "../../../services/projects/projects.service";
import {UserStory} from "../../../domain/user-story";

@Component({
    selector: 'app-product-backlog',
    templateUrl: './product-backlog.component.html',
    styleUrls: ['../../../app.component.css', './product-backlog.component.css']
})
export class ProductBacklogComponent implements OnInit {
    productBacklog: string[] = [];
    projectName: string | null = "";
    isButtonPressed: boolean = false;

    constructor(private route: ActivatedRoute,
                private userStoryService: UserStoriesService,
                private projectService: ProjectsService) { }

    ngOnInit(): void {
        this.projectName = this.route.snapshot.paramMap.get("projectName");
        this.loadProductBacklog();
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

    toggleButtonPress(isPressed: boolean) {
        this.isButtonPressed = isPressed;
    }
}
