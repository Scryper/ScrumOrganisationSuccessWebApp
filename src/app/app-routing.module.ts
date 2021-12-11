import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MeetTheTeamComponent } from "./view/visitor/meet-the-team/meet-the-team.component";
import { ContactComponent } from "./view/visitor/contact/contact.component";
import { TutorialComponent } from "./view/visitor/tutorial/tutorial.component";
import { FaqComponent } from "./view/visitor/faq/faq.component";
import { SignUpComponent } from "./view/visitor/sign-up/sign-up.component";
import { LoginComponent } from "./view/visitor/login/login.component";
import { HomeComponent } from "./view/visitor/home/home.component";
import { AdditionalInfosComponent } from "./view/visitor/additional-infos/additional-infos.component";
import { ProfileComponent } from "./view/connected/developer/profile/profile.component";

import { ProjectsComponent } from "./view/connected/developer/projects/projects.component";
import { TodayComponent } from "./view/connected/developer/today/today.component";
import {  ProjectManagerComponent } from "./view/connected/product-owner/project-manager/project-manager.component";
import { CreateProjectComponent } from "./view/connected/product-owner/create-project/create-project.component";
import { MyProjectComponent } from "./view/connected/product-owner/my-project/my-project.component";
import { OldProjectsComponent } from "./view/connected/product-owner/old-projects/old-projects.component";
import { NotificationComponent } from "./view/connected/product-owner/notification/notification.component";
import { NotFoundComponent } from "./view/not-found/not-found.component";
import {MeetingComponent} from "./view/connected/developer/meeting/meeting.component";


const routes: Routes = [
    {path: '', component : HomeComponent},
    {path: 'team', component: MeetTheTeamComponent},
    {path: 'contact', component: ContactComponent},
    {path: 'tutorial', component: TutorialComponent},
    {path: 'faq', component: FaqComponent},
    {path: 'login', component : LoginComponent},
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
    {path: 'notification', component : NotificationComponent},
    {path: '**', component: NotFoundComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
