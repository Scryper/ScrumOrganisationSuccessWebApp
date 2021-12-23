import { Component, OnInit } from '@angular/core';
import {UserStory} from "../../../domain/user-story";
import {UserStoriesService} from "../../../services/user-stories/user-stories.service";
import {SprintsUserStoriesService} from "../../../services/sprints-user-stories/sprints-user-stories.service";

@Component({
  selector: 'app-sprint-user-story',
  templateUrl: './sprint-user-story.component.html',
  styleUrls: ['../../../app.component.css', './sprint-user-story.component.css']
})
export class SprintUserStoryComponent implements OnInit {

    UserStories:UserStory[] = [];
    idUserStories:number[] = [];

  constructor(private userStoriesService:UserStoriesService,
              private sprintsUserStoriesService:SprintsUserStoriesService) { }

    ngOnInit(): void {
    }

    // Récupérer les id des userStories voulu avec le service Sprint UserStory
    private fillIdUserStories() {
        this.idUserStories = []; // A Modif
        // Service : sprintsUserStoriesService

    }



    // Récupérer les userStories qui match avec la liste d'id précédement récupéré
    private fillUserStories() {
        this.UserStories = []; // A Modif
        // Service : userStoriesService

    }



}
