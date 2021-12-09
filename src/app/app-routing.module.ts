import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MeetTheTeamComponent} from "./view/visitor/meet-the-team/meet-the-team.component";
import {ContactComponent} from "./view/visitor/contact/contact.component";
import {TutorialComponent} from "./view/visitor/tutorial/tutorial.component";
import {FaqComponent} from "./view/visitor/faq/faq.component";
import {SignUpComponent} from "./view/visitor/sign-up/sign-up.component";
import {SignInComponent} from "./view/visitor/sign-in/sign-in.component";
import {HomeComponent} from "./view/visitor/home/home.component";

const routes: Routes = [
    {path: '', component : HomeComponent},
    {path: 'team', component: MeetTheTeamComponent},
    {path: 'contact', component: ContactComponent},
    {path: 'tutorial', component: TutorialComponent},
    {path: 'faq', component: FaqComponent},
    {path: 'login', component : SignInComponent},
    {path: 'signUp', component : SignUpComponent},
    {path: 'homeVisiteur', component : HomeComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
