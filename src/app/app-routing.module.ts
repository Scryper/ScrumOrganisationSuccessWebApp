import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MeetTheTeamComponent } from "./view/visitor/meet-the-team/meet-the-team.component";
import { ContactComponent } from "./view/visitor/contact/contact.component";
import { TutorialComponent } from "./view/visitor/tutorial/tutorial.component";
import { FaqComponent } from "./view/visitor/faq/faq.component";
import { SignUpComponent } from "./view/visitor/sign-up/sign-up.component";
import { LoginComponent } from "./view/visitor/login/login.component";
import { HomeComponent } from "./view/visitor/home/home.component";
import { ProfileComponent } from "./view/connected/profile/profile.component";
import { TodayComponent } from "./view/connected/today/today.component";
import { ProjectManagerComponent } from "./view/connected/project-manager/project-manager.component";
import { CreateProjectComponent } from "./view/connected/create-project/create-project.component";
import { MyProjectComponent } from "./view/connected/my-project/my-project.component";
import { NotificationComponent } from "./view/connected/notification/notification.component";
import { NotFoundComponent } from "./view/not-found/not-found.component";
import {MeetingComponent} from "./view/connected/meeting/meeting.component";
import { AuthGuard } from './helpers/guard/auth.guard';
import {ProductBacklogComponent} from "./view/connected/product-backlog/product-backlog.component";
import {JoinProjectComponent} from "./view/connected/join-project/join-project.component";
import {UsersRequestComponent} from "./view/connected/users-request/users-request.component";
import {CreateSprintComponent} from "./view/connected/create-sprint/create-sprint.component";
import {VisitorGuard} from "./helpers/guard/visitor.guard";
import {JitsiComponent} from "./view/video-call/jitsi/jitsi.component";
import {VideoComponent} from "./view/video-call/video/video.component";
import { ProjectPreviewComponent } from "./view/connected/project-preview/project-preview.component";

const routes: Routes = [
    {path: '', component : HomeComponent},
    {path: 'team', component: MeetTheTeamComponent},
    {path: 'contact', component: ContactComponent},
    {path: 'tutorial', component: TutorialComponent},
    {path: 'faq', component: FaqComponent},
    {path: 'login', component : LoginComponent, canActivate:[VisitorGuard]},
    {path: 'signUp', component : SignUpComponent, canActivate:[VisitorGuard]},
    {path: 'homeVisitor', component : HomeComponent},
    {path: 'profile', component : ProfileComponent, canActivate:[AuthGuard]},
    {path: 'meetings', component : MeetingComponent, canActivate:[AuthGuard]},
    {path: 'today', component : TodayComponent, canActivate:[AuthGuard]},
    {path: 'projectManager', component : ProjectManagerComponent, canActivate:[AuthGuard]},
    {path: 'createProject', component : CreateProjectComponent, canActivate:[AuthGuard]},
    {path: 'myProject/:projectName', component : MyProjectComponent, canActivate:[AuthGuard]},
    {path: 'notification', component : NotificationComponent, canActivate:[AuthGuard]},
    {path: 'productBacklog/:projectName', component : ProductBacklogComponent, canActivate:[AuthGuard]},
    {path: 'joinProject', component : JoinProjectComponent, canActivate:[AuthGuard]},
    {path: 'usersRequest', component : UsersRequestComponent, canActivate:[AuthGuard]},
    {path: 'createSprint', component : CreateSprintComponent, canActivate:[AuthGuard]},
    {path: 'projectPreview/:projectName', component : ProjectPreviewComponent, canActivate:[AuthGuard]},
    {path: 'videocall', component : VideoComponent,canActivate:[AuthGuard]},
    {path: '**', component: NotFoundComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
