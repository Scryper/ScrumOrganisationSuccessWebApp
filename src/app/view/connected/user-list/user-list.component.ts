import { Component, OnInit } from '@angular/core';
import {SosUser} from "../../../domain/sos-user";
import {Subscription} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {UserStoriesService} from "../../../services/user-stories/user-stories.service";
import {ProjectsService} from "../../../services/projects/projects.service";
import {Role} from "../../../domain/role";
import {map} from "rxjs/operators";
import {UserService} from "../../../services";
import {UsersProjectsService} from "../../../services/users-projects/users-projects.service";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css' , '../../../app.component.css', '../product-backlog/product-backlog.component.css']
})
export class UserListComponent implements OnInit {
    projectName: string | null = "";
    isButtonPressed: boolean = false;
    idProject: number = 0;
    id : number = 0;

    users: SosUser[]=[];
    private subscription: Subscription | undefined;
    isProductOwner: boolean = false;
    currentUser:SosUser=null!;

  constructor(private route: ActivatedRoute,
              private userStoriesService:UserStoriesService,
              private userStoryService: UserStoriesService,
              private userService: UserService,
              private userProjectService : UsersProjectsService) { }

    ngOnDestroy(): void {
        this.subscription?.unsubscribe();
    }

  ngOnInit(): void {
      this.isProductOwner = JSON.parse(<string>localStorage.getItem('currentUser')).role == Role.ProductOwner;
      this.id = JSON.parse(<string>localStorage.getItem('currentUser')).id;
      this.idProject = <number><unknown>this.route.snapshot.paramMap.get("idProject");
      this.projectName = this.route.snapshot.paramMap.get("projectName");
      this.loadUsers();
  }

    private loadUsers() {
        this.subscription?.unsubscribe();
        this.subscription = this.getUsers().subscribe();
    }

    private getUsers(){
        return this.userService.getByIdProject(this.idProject).pipe(
          map(users=>{
              for (let user of users){
                  if(user.id !=this.id){
                      this.users.push(user);
                  }
              }
          })
        )
    }

    deleteUserProject(user:SosUser) {
        this.subscription?.unsubscribe();
        this.subscription = this.userProjectService.deleteDeveloperProjectByidDeveloperByidProject(user.id,this.idProject).pipe(
            map(() =>{
                this.users = [];
                this.getUsers().subscribe();
            })
        ).subscribe();
    }

    toggleButtonPress(b: boolean) {

    }
}
