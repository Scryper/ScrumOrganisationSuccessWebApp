import { NgModule } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';
import { FullCalendarModule } from '@fullcalendar/angular'; // FullCalendar
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin!
import interactionPlugin from '@fullcalendar/interaction';

import { AppComponent } from './app.component';
import { HomeComponent } from './visitor/home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SignInComponent } from './visitor/sign-in/sign-in.component';
import { SignUpComponent } from './visitor/sign-up/sign-up.component';
import { ContactComponent } from './visitor/contact/contact.component';
import { MeetTheTeamComponent } from './visitor/meet-the-team/meet-the-team.component';
import { TutorialComponent } from './visitor/tutorial/tutorial.component';
import { FaqComponent } from './visitor/faq/faq.component';
import {ReactiveFormsModule} from "@angular/forms";
import { TodayComponent } from './connected/developer/today/today.component';
import { MeetingComponent } from './connected/developer/meeting/meeting.component';
import { ProjectsComponent } from './connected/developer/projects/projects.component';
import { DeveloperComponent } from './connected/developer/developer.component';
import { ProductOwnerComponent } from './connected/product-owner/product-owner.component';
import { ScrumMasterComponent } from './connected/scrum-master/scrum-master.component';
import { NavbarVisitorComponent } from './navbar/navbar-visitor/navbar-visitor.component';
import { NavbarConnectedComponent } from './navbar/navbar-connected/navbar-connected.component';
import { NavbarDeveloperComponent } from './navbar/navbar-connected/navbar-developer/navbar-developer.component';
import { NavbarScrumMasterComponent } from './navbar/navbar-connected/navbar-scrum-master/navbar-scrum-master.component';
import { NavbarProductOwnerComponent } from './navbar/navbar-connected/navbar-product-owner/navbar-product-owner.component';
import { ConnectedComponent } from './connected/connected.component';
import { VisitorComponent } from './visitor/visitor.component';
import { AppRoutingModule } from './app-routing.module';
import { AdditionalInfosComponent } from './visitor/additional-infos/additional-infos.component';
import { ProfileComponent } from './connected/developer/profile/profile.component';
import { CreateProjectComponent } from './connected/product-owner/create-project/create-project.component';
import { ProjectManagerComponent } from './connected/product-owner/project-manager/project-manager.component';
import { MyProjectComponent } from './connected/product-owner/my-project/my-project.component';
import { OldProjectsComponent } from './connected/product-owner/old-projects/old-projects.component';
import { NotificationComponent } from './connected/product-owner/notification/notification.component';


FullCalendarModule.registerPlugins([ // register FullCalendar plugins
    dayGridPlugin,
    interactionPlugin
]);


@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        NavbarComponent,
        SignInComponent,
        SignUpComponent,
        ContactComponent,
        MeetTheTeamComponent,
        TutorialComponent,
        FaqComponent,
        TodayComponent,
        MeetingComponent,
        ProjectsComponent,
        DeveloperComponent,
        ProductOwnerComponent,
        ScrumMasterComponent,
        NavbarVisitorComponent,
        NavbarConnectedComponent,
        NavbarDeveloperComponent,
        NavbarScrumMasterComponent,
        NavbarProductOwnerComponent,
        ConnectedComponent,
        VisitorComponent,
        AdditionalInfosComponent,
        ProfileComponent,
        CreateProjectComponent,
        ProjectManagerComponent,
        MyProjectComponent,
        OldProjectsComponent,
        NotificationComponent
    ],
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        FullCalendarModule, // FullCalendar
        AppRoutingModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
