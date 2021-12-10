import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MeetTheTeamComponent} from "./visitor/meet-the-team/meet-the-team.component";
import {ContactComponent} from "./visitor/contact/contact.component";
import {TutorialComponent} from "./visitor/tutorial/tutorial.component";
import {FaqComponent} from "./visitor/faq/faq.component";
import {SignUpComponent} from "./visitor/sign-up/sign-up.component";
import {SignInComponent} from "./visitor/sign-in/sign-in.component";
import {HomeComponent} from "./visitor/home/home.component";
import {AdditionalInfosComponent} from "./visitor/additional-infos/additional-infos.component";
import {ProfileComponent} from "./connected/developer/profile/profile.component";
import {MeetingComponent} from "./connected/developer/meeting/meeting.component";
import {ProjectsComponent} from "./connected/developer/projects/projects.component";
import {TodayComponent} from "./connected/developer/today/today.component";
import {ProjectManagerComponent} from "./connected/product-owner/project-manager/project-manager.component";
import {CreateProjectComponent} from "./connected/product-owner/create-project/create-project.component";
import {MyProjectComponent} from "./connected/product-owner/my-project/my-project.component";
import {OldProjectsComponent} from "./connected/product-owner/old-projects/old-projects.component";
import {NotificationComponent} from "./connected/product-owner/notification/notification.component";

const routes: Routes = [
    {path: '', component : HomeComponent},
    {path: 'team', component: MeetTheTeamComponent},
    {path: 'contact', component: ContactComponent},
    {path: 'tutorial', component: TutorialComponent},
    {path: 'faq', component: FaqComponent},
    {path: 'login', component : SignInComponent},
    {path: 'signUp', component : SignUpComponent},
    {path: 'homeVisitor', component : HomeComponent},
    {path: 'AdditionalInfos', component : AdditionalInfosComponent},
    {path: 'profile', component : ProfileComponent},
    {path: 'meetings', component : MeetingComponent},
    {path: 'projects', component : ProjectsComponent},
    {path: 'today', component : TodayComponent},
    {path: 'projectManager', component : ProjectManagerComponent},
    {path: 'createProject', component : CreateProjectComponent},
    {path: 'myProject', component : MyProjectComponent},
    {path: 'oldProjects', component : OldProjectsComponent},
    {path: 'notification', component : NotificationComponent}

];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
