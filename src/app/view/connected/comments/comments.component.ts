import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {UserStory} from "../../../domain/user-story";
import {UserStoriesService} from "../../../services/user-stories/user-stories.service";
import {map} from "rxjs/operators";
import {Subscription} from "rxjs";
import {CommentsService} from "../../../services/comments/comments.service";
import {SosComment} from "../../../domain/sos-comment";
import {DatePipe} from "@angular/common";
import {SosUser} from "../../../domain/sos-user";
import {UserService} from "../../../services";

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['../../../app.component.css', './comments.component.css']
})
export class CommentsComponent implements OnInit, OnDestroy {
    private subscription: Subscription | undefined;
    currentUser:SosUser= {
        id:0,
        birthdate: new Date(),
        email: "",
        firstname: "",
        lastname: "",
        password: "",
        role: 0
    };

    addContent:string = "";
    addcomment:SosComment = {
        content: "",
        idUser: 0,
        idUserStory: 0,
        postedAt: new Date()
    };

    idActualUserStory:number=0;
    actualUserStory:UserStory = {
        id:0,
        name:"",
        idProject:0,
        description:"",
        priority:0
    };
    comments:SosComment[] = [];

    usersComment:SosUser[] = [];

  constructor(private activatedRoute: ActivatedRoute,
              private userStoriesService:UserStoriesService,
              private commentsService:CommentsService,
              private userService:UserService) { }


    ngOnDestroy(): void {
        this.subscription?.unsubscribe();
    }

  ngOnInit(): void {
      this.currentUser = <SosUser>JSON.parse(<string>localStorage.getItem('currentUser'));
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
                this.comments = commentsTmp;
              })
          ).subscribe()
  }

  formatDate(date:Date):string {
      let datepipe = new DatePipe('en-US');
      let latest_date =datepipe.transform(date, 'dd/MM/yyyy | HH:mm:ss');
      return latest_date!;
  }

  private fillAddComment() {
      let datepipe = new DatePipe('en-US');
      let latest_date =datepipe.transform(new Date(), 'yyyy-MM-dd HH:mm:ss');
      let date = new Date(latest_date!);
      console.log(date)
      this.addcomment.content = this.addContent;
      if (this.currentUser.id != null) {
          this.addcomment.idUser = this.currentUser.id;
      }
      this.addcomment.idUserStory = this.idActualUserStory;
      this.addcomment.postedAt = date;
  }

    addComment() {
        this.fillAddComment();
        this.subscription = this.commentsService.addComment(this.addcomment).subscribe();
        this.comments.push(this.addcomment);
    }

    fillUsersComment() {
        this.idActualUserStory;
    }

}
