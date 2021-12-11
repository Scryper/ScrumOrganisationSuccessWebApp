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
import { ProfileComponent } from "./view/connected/profile/profile.component";
import { TodayComponent } from "./view/connected/today/today.component";
import { ProjectManagerComponent } from "./view/connected/project-manager/project-manager.component";
import { CreateProjectComponent } from "./view/connected/create-project/create-project.component";
import { MyProjectComponent } from "./view/connected/my-project/my-project.component";
import { NotificationComponent } from "./view/connected/notification/notification.component";
import { NotFoundComponent } from "./view/not-found/not-found.component";
import {MeetingComponent} from "./view/connected/meeting/meeting.component";

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
    {path: 'today', component : TodayComponent},
    {path: 'projectManager', component : ProjectManagerComponent},
    {path: 'createProject', component : CreateProjectComponent},
    {path: 'myProject', component : MyProjectComponent},
    {path: 'notification', component : NotificationComponent},
    {path: '**', component: NotFoundComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
