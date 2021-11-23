import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MeetTheTeamComponent} from "./visitor/meet-the-team/meet-the-team.component";
import {ContactComponent} from "./visitor/contact/contact.component";
import {TutorialComponent} from "./visitor/tutorial/tutorial.component";
import {FaqComponent} from "./visitor/faq/faq.component";
import {SignUpComponent} from "./visitor/sign-up/sign-up.component";
import {SignInComponent} from "./visitor/sign-in/sign-in.component";
import {HomeComponent} from "./visitor/home/home.component";

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
