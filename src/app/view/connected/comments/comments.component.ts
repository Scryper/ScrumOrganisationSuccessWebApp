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

interface CommentUser {
    comment:SosComment,
    user:SosUser
}

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['../../../app.component.css', './comments.component.css']
})
export class CommentsComponent implements OnInit, OnDestroy {
    private subscription: Subscription | undefined;

    tmp:CommentUser = {
        comment:null!,
        user:null!
    }

    commentUser:CommentUser[] = [];

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

    usersName:string[] = [];

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
                  this.fillUsersComment();
              })
          ).subscribe()
  }

  private fillComments() {

      this.subscription = this.commentsService.getByIdUserStory(this.idActualUserStory)
          .pipe(
              map(commentsTmp => {

                  // COMMENT USER
                  let tmp:CommentUser = {
                      comment:null!,
                      user:null!
                  };
                  for (let elt of commentsTmp) {

                      /*this.commentUser.push(tmp)*/
                      this.fillCommentUser(elt.idUser,elt)

                  }

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
        this.fillUsersComment();
    }

    fillUsersComment() {
        this.subscription = this.userService.getByCommentOnUserStory(this.idActualUserStory)
            .pipe(
                map(users => {

                    for (let elt of users) {
                        this.usersComment.push(elt);
                    }


                })
            ).subscribe()
    }

    fillCommentUser(idUser:number, comment:SosComment) {

      for (let elt of this.usersComment) {
          if (idUser == elt.id) {
              this.tmp = {
                  comment:comment,
                  user:elt
              }
              console.log(this.tmp)
              this.commentUser.push(this.tmp);
          }
      }
    }

}
