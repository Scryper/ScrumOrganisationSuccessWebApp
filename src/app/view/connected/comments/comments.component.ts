import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {UserStory} from "../../../domain/user-story";
import {UserStoriesService} from "../../../services/user-stories/user-stories.service";
import {map} from "rxjs/operators";
import {Subscription} from "rxjs";
import {CommentsService} from "../../../services/comments/comments.service";
import {SosComment} from "../../../domain/sos-comment";

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['../../../app.component.css', './comments.component.css']
})
export class CommentsComponent implements OnInit, OnDestroy {
    private subscription: Subscription | undefined;

    idActualUserStory:number=0;
    actualUserStory:UserStory = {
        id:0,
        name:"",
        idProject:0,
        description:"",
        priority:0
    };
    comments:SosComment[] = [];

  constructor(private activatedRoute: ActivatedRoute,
              private userStoriesService:UserStoriesService,
              private commentsService:CommentsService) { }


    ngOnDestroy(): void {
        this.subscription?.unsubscribe();
    }

  ngOnInit(): void {
      this.idActualUserStory = Number(this.activatedRoute.snapshot.paramMap.get("idUserStory"));
      this.fillActualUserStory();
  }

  private fillActualUserStory() {
      this.subscription = this.userStoriesService.getById(this.idActualUserStory)
          .pipe(
              map(userStories => {
                  this.actualUserStory = userStories;
                  this.fillComments();
              })
          ).subscribe()
  }

  private fillComments() {

      this.subscription = this.commentsService.getByIdUserStory(this.idActualUserStory)
          .pipe(
              map(commentsTmp => {
                  console.log(commentsTmp)
                this.comments = commentsTmp;
              })
          ).subscribe()
  }

  formatDate(date:Date):string {
      return date.toString().replace('T', ' | ');
  }

}
