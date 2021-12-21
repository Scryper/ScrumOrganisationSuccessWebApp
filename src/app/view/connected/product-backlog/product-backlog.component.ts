import { Component, OnInit } from '@angular/core';
import {UserStoriesService} from "../../../services/user-stories/user-stories.service";
import {ActivatedRoute} from "@angular/router";
import {ProjectsService} from "../../../services/projects/projects.service";
import {UserStory} from "../../../domain/user-story";
import {SosUser} from "../../../domain/sos-user";
import {Role} from "../../../domain/role";

@Component({
    selector: 'app-product-backlog',
    templateUrl: './product-backlog.component.html',
    styleUrls: ['../../../app.component.css', './product-backlog.component.css']
})
export class ProductBacklogComponent implements OnInit {
    projectName: string | null = "";
    isButtonPressed: boolean = false;
    idProject: number = 0;

    productBacklog:UserStory[] =[];

    currentUser:SosUser=null!;

    isProductOwner:boolean = false;


    constructor(private route: ActivatedRoute,
                private userStoriesService:UserStoriesService,
                private userStoryService: UserStoriesService,
                private projectService: ProjectsService) { }

    ngOnInit(): void {

        this.currentUser = JSON.parse(<string>localStorage.getItem('currentUser'));
        if(this.currentUser.role == Role.ProductOwner) this.isProductOwner = true;

        this.idProject = <number><unknown>this.route.snapshot.paramMap.get("idProject");
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
                this.productBacklog.push(userStory);
            }
        });
    }

    toggleButtonPress(isPressed: boolean) {
        this.isButtonPressed = isPressed;
    }

    deleteUserStory(userStory:UserStory) {
        this.userStoriesService.deleteUserStory(userStory).then(()=>{
            this.productBacklog=this.productBacklog.filter((tmp)=> {
                return userStory.id!=tmp.id;
            });
        })
    }

    modifyUserStory(userStory:UserStory) {
        console.log(userStory);
    }
}
