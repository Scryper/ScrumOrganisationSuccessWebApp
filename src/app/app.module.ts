import { NgModule } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS} from "@angular/common/http";
import { FullCalendarModule } from '@fullcalendar/angular'; // FullCalendar
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin!
import interactionPlugin from '@fullcalendar/interaction';

import { AppComponent } from './app.component';
import { HomeComponent } from './view/visitor/home/home.component';
import { NavbarComponent } from './view/navbar/navbar.component';
import { SignInComponent } from './view/visitor/sign-in/sign-in.component';
import { SignUpComponent } from './view/visitor/sign-up/sign-up.component';
import { ContactComponent } from './view/visitor/contact/contact.component';
import { MeetTheTeamComponent } from './view/visitor/meet-the-team/meet-the-team.component';
import { TutorialComponent } from './view/visitor/tutorial/tutorial.component';
import { FaqComponent } from './view/visitor/faq/faq.component';
import {ReactiveFormsModule} from "@angular/forms";
import { TodayComponent } from './view/connected/developer/today/today.component';
import { MeetingComponent } from './view/connected/developer/meeting/meeting.component';
import { ProjectsComponent } from './view/connected/developer/projects/projects.component';
import { DeveloperComponent } from './view/connected/developer/developer.component';
import { ProductOwnerComponent } from './view/connected/product-owner/product-owner.component';
import { ScrumMasterComponent } from './view/connected/scrum-master/scrum-master.component';
import { NavbarVisitorComponent } from './view/navbar/navbar-visitor/navbar-visitor.component';
import { NavbarConnectedComponent } from './view/navbar/navbar-connected/navbar-connected.component';
import { NavbarDeveloperComponent } from './view/navbar/navbar-connected/navbar-developer/navbar-developer.component';
import { NavbarScrumMasterComponent } from './view/navbar/navbar-connected/navbar-scrum-master/navbar-scrum-master.component';
import { NavbarProductOwnerComponent } from './view/navbar/navbar-connected/navbar-product-owner/navbar-product-owner.component';
import { ConnectedComponent } from './view/connected/connected.component';
import { VisitorComponent } from './view/visitor/visitor.component';
import { AppRoutingModule } from './app-routing.module';
import { NotFoundComponent } from './view/not-found/not-found.component';
import {ErrorInterceptor, JwtInterceptor} from "./helpers";

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
        NotFoundComponent
    ],
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        FullCalendarModule, // FullCalendar
        AppRoutingModule,
        HttpClientModule
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
