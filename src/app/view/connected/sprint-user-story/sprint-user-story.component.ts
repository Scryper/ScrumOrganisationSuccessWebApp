import {Component, OnDestroy, OnInit} from '@angular/core';
import {UserStory} from "../../../domain/user-story";
import {UserStoriesService} from "../../../services/user-stories/user-stories.service";
import {SprintsUserStoriesService} from "../../../services/sprints-user-stories/sprints-user-stories.service";
import {map} from "rxjs/operators";
import {Subscription} from "rxjs";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-sprint-user-story',
  templateUrl: './sprint-user-story.component.html',
  styleUrls: ['../../../app.component.css', './sprint-user-story.component.css']
})
export class SprintUserStoryComponent implements OnInit, OnDestroy {

    private subscription: Subscription | undefined;
    UserStories:UserStory[] = [];

    projectName: string | null = "";
    idProject: number = 0;
    idSprint: number = 0;
    sprintName: string | null = "";


  constructor(private userStoriesService:UserStoriesService,
              private sprintsUserStoriesService:SprintsUserStoriesService,
              private activatedRoute: ActivatedRoute,) { }

    ngOnDestroy(): void {
        this.subscription?.unsubscribe();
    }

    ngOnInit(): void {
        this.idSprint = Number(this.activatedRoute.snapshot.paramMap.get("idSprint"));
        this.sprintName = this.activatedRoute.snapshot.paramMap.get("sprintName");

        this.fillUserStories();
    }

    // Récupérer les userStories qui match avec la liste d'id précédement récupéré
    private fillUserStories() {

        this.subscription = this.userStoriesService.getByIdSprint(this.idSprint)
            .pipe(
                map(UserStoriesTmp => {
                    this.UserStories = UserStoriesTmp;
                })
            ).subscribe()

    }

}
