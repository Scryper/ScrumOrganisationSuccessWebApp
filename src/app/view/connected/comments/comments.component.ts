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
    isBackButtonPressed: boolean = false;
    projectName: string | null = "";
    idProject: number = 0;

    tmp:CommentUser = {
        comment:null!,
        user:null!
    }

    actualUserStory:UserStory = {
        description: "", idProject: 0, name: "", priority: 0
    };
    currentUser:SosUser=null!;
    idActualUserStory:number=0;

    addContent:string = "";

    commentUser:CommentUser[] = [];
    usersComment:SosUser[] = [];

  constructor(private activatedRoute: ActivatedRoute,
              private userStoriesService:UserStoriesService,
              private commentsService:CommentsService,
              private userService:UserService) { }


    ngOnDestroy(): void {
        this.subscription?.unsubscribe();
    }

  ngOnInit(): void {
      this.commentUser=[];
      this.usersComment = [];
      this.projectName = this.activatedRoute.snapshot.paramMap.get("projectName");
      this.currentUser = <SosUser>JSON.parse(<string>localStorage.getItem('currentUser'));
      this.idActualUserStory = Number(this.activatedRoute.snapshot.paramMap.get("idUserStory"));
      this.fillActualUserStory();
  }


  private fillActualUserStory() {
      this.commentUser=[];
      this.subscription = this.userStoriesService.getById(this.idActualUserStory)
          .pipe(
              map(userStories => {
                  this.actualUserStory = userStories;
                  this.idProject = userStories.idProject;
                  this.subscription = this.fillUsersComment().pipe(map(()=>{this.fillComments();})).subscribe();
              })
          ).subscribe()
  }

  //récupère les commentaires d'une user story spécifique
  private fillComments() {
      this.subscription = this.commentsService.getByIdUserStory(this.idActualUserStory)
          .pipe(
              map(commentsTmp => {

                  // récupère les utilisateurs qui ont commenté l'US et les ajouter a un vecteur
                  this.fillUsersComment();

                  //parcours tous les commentaires et pour chacun
                    //parcours les utilisateurs qui ont commenté et ajoute au tableau final COMMENT - USER la valeur du commentaire et de lutilisateur
                  for (let elt of commentsTmp) {
                      this.fillCommentUser(elt.idUser,elt)
                  }
              })
          ).subscribe()
  }

  formatDate(date:Date):string {
      let datepipe = new DatePipe('en-US');
      let latest_date =datepipe.transform(date, 'dd/MM/yyyy | HH:mm:ss');
      return latest_date!;
  }


    addComment() {
      if(this.addContent==""){return;}
      //initialize empty comment
        let addcomment = {
            content: "",
            idUser: 0,
            idUserStory: 0,
            postedAt: new Date()
        };

      //get the date and format it
        let datepipe = new DatePipe('en-US');
        let latest_date =datepipe.transform(new Date(), 'yyyy-MM-dd HH:mm:ss');
        let date = new Date(latest_date!);

        //set le content du comment
        addcomment.content = this.addContent;
        addcomment.idUser = this.currentUser.id!;
        addcomment.idUserStory = this.idActualUserStory;
        addcomment.postedAt = date;

        this.commentsService.addComment(addcomment).pipe(map(()=>{
            this.commentUser.push({ comment:addcomment,
                                    user:this.currentUser});
            let notCommentedYet = true;
            for(let elt of this.usersComment){
                if(elt.id==this.currentUser.id)notCommentedYet=false
            }
            if(notCommentedYet)this.usersComment.push(this.currentUser);

        })).subscribe();

        this.addContent = "";

    }

    // récupère les utilisateurs qui ont commenté l'US et les ajouter a un vecteur
    fillUsersComment() {
        return this.userService.getByCommentOnUserStory(this.idActualUserStory)
            .pipe(
                map(users => {
                    this.usersComment = [];
                    for (let elt of users) {
                        this.usersComment.push(elt);
                    }
                })
            )
    }

    //parcours les utilisateurs qui ont commenté et ajoute au tableau final COMMENT - USER la valeur du commentaire et de lutilisateur
    fillCommentUser(idUser:number, comment:SosComment) {
      for (let elt of this.usersComment) {
          if (idUser == elt.id) {
              this.tmp = {
                  comment:comment,
                  user:elt
              }
              this.commentUser.push(this.tmp);
          }
      }
    }

    toggleBackButtonPress(isPressed: boolean) {
        this.isBackButtonPressed = isPressed;
    }

}
