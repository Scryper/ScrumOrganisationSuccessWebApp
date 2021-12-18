import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS} from "@angular/common/http";
import { BrowserModule } from '@angular/platform-browser';
import { FullCalendarModule } from '@fullcalendar/angular'; // FullCalendar
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin!
import interactionPlugin from '@fullcalendar/interaction';

import { AppComponent } from './app.component';
import { HomeComponent } from './view/visitor/home/home.component';
import { NavbarComponent } from './view/navbar/navbar.component';
import { LoginComponent } from './view/visitor/login/login.component';
import { SignUpComponent } from './view/visitor/sign-up/sign-up.component';
import { ContactComponent } from './view/visitor/contact/contact.component';
import { MeetTheTeamComponent } from './view/visitor/meet-the-team/meet-the-team.component';
import { TutorialComponent } from './view/visitor/tutorial/tutorial.component';
import { FaqComponent } from './view/visitor/faq/faq.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { TodayComponent } from './view/connected/today/today.component';
import { MeetingComponent } from './view/connected/meeting/meeting.component';
import { NavbarVisitorComponent } from './view/navbar/navbar-visitor/navbar-visitor.component';
import { NavbarConnectedComponent } from './view/navbar/navbar-connected/navbar-connected.component';
import { NavbarDeveloperComponent } from './view/navbar/navbar-connected/navbar-developer/navbar-developer.component';
import { NavbarScrumMasterComponent } from './view/navbar/navbar-connected/navbar-scrum-master/navbar-scrum-master.component';
import { NavbarProductOwnerComponent } from './view/navbar/navbar-connected/navbar-product-owner/navbar-product-owner.component';
import { ConnectedComponent } from './view/connected/connected.component';
import { VisitorComponent } from './view/visitor/visitor.component';
import { AppRoutingModule } from './app-routing.module';
import { ProfileComponent } from './view/connected/profile/profile.component';
import { CreateProjectComponent } from './view/connected/create-project/create-project.component';
import { ProjectManagerComponent } from './view/connected/project-manager/project-manager.component';
import { MyProjectComponent } from './view/connected/my-project/my-project.component';
import { NotificationComponent } from './view/connected/notification/notification.component';
import {ErrorInterceptor, JwtInterceptor} from "./helpers";
import { ProductBacklogComponent } from './view/connected/product-backlog/product-backlog.component';
import { JoinProjectComponent } from './view/connected/join-project/join-project.component';
import { JitsiComponent } from './view/video-call/jitsi/jitsi.component';
import { UsersRequestComponent } from './view/connected/users-request/users-request.component';
import { CreateSprintComponent } from './view/connected/create-sprint/create-sprint.component';
import { VideoComponent } from './view/video-call/video/video.component';
import { ProjectPreviewComponent } from './view/connected/project-preview/project-preview.component';

FullCalendarModule.registerPlugins([ // register FullCalendar plugins
    dayGridPlugin,
    interactionPlugin
]);


@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        NavbarComponent,
        LoginComponent,
        SignUpComponent,
        ContactComponent,
        MeetTheTeamComponent,
        TutorialComponent,
        FaqComponent,
        TodayComponent,
        MeetingComponent,
        NavbarVisitorComponent,
        NavbarConnectedComponent,
        NavbarDeveloperComponent,
        NavbarScrumMasterComponent,
        NavbarProductOwnerComponent,
        ConnectedComponent,
        VisitorComponent,
        ProfileComponent,
        CreateProjectComponent,
        ProjectManagerComponent,
        MyProjectComponent,
        NotificationComponent,
        JitsiComponent,
        UsersRequestComponent,
        JoinProjectComponent,
        ProductBacklogComponent,
        ProjectPreviewComponent,
        CreateSprintComponent,
        VideoComponent
    ],
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        FullCalendarModule, // FullCalendar
        AppRoutingModule,
        HttpClientModule,
        FormsModule
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
