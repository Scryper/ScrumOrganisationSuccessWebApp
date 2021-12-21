import {Component, OnDestroy, OnInit} from '@angular/core';
import { SprintsService } from "../../../services/sprints/sprints.service";
import { ActivatedRoute } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { UserStory } from "../../../domain/user-story";
import { SprintsUserStoriesService } from "../../../services/sprints-user-stories/sprints-user-stories.service";
import { UserStoriesService } from "../../../services/user-stories/user-stories.service";
import { UserService } from "../../../services";
import { MeetingsService } from "../../../services/meetings/meetings.service";
import { Meeting } from "../../../domain/meeting";
import { ParticipationService } from "../../../services/participation/participation.service";
import { Participation } from "../../../domain/participation";
import { map } from "rxjs/operators";
import { Subscription } from "rxjs";
import {ProjectsService} from "../../../services/projects/projects.service";

@Component({
    selector: 'app-modify-sprint',
    templateUrl: './modify-sprint.component.html',
    styleUrls: ['../../../app.component.css', './modify-sprint.component.css']
})
export class ModifySprintComponent implements OnInit, OnDestroy {
    isButtonSaveNewMeetingPressed: boolean = false;

    isInSprint: boolean[] = [];

    idSprint: number = 0;
    idProject: number = 0;
    sprintName: string | null = "";
    idMeeting: number = 0;
    idsUsersOnProject: number[] = [];

    userStories: UserStory[] = [];

    form: FormGroup = this.fb.group({
        newMeeting: this.fb.group({
            schedule: this.fb.control('', Validators.required),
            name: this.fb.control('', Validators.required),
            description: this.fb.control('', Validators.required)
        })
    });

    private subscription: Subscription | undefined;
    private projectName: string | null = "";

    constructor(private fb: FormBuilder,
                private sprintService: SprintsService,
                private route: ActivatedRoute,
                private sprintUserStoryService: SprintsUserStoriesService,
                private userStoryService: UserStoriesService,
                private userService: UserService,
                private meetingService: MeetingsService,
                private participationService: ParticipationService,
                private projectService: ProjectsService) { }

    ngOnDestroy(): void {
        this.subscription?.unsubscribe();
    }

    ngOnInit(): void {
        let idSprintAsString: string | null = this.route.snapshot.paramMap.get("sprintId");
        this.projectName = this.route.snapshot.paramMap.get("projectName");
        if (typeof idSprintAsString === "string") {
            this.idSprint = parseInt(idSprintAsString, 10); // cast to int because params are string by default
        }
        this.subscription = this.projectService.getByProjectName(this.projectName)
            .pipe(
                map(project => {
                    if (project.id != null) {
                        this.idProject = project.id
                    }
                    this.userService.getByIdProject(this.idProject).subscribe(users => {
                        for(let user of users) {
                            if (user.id != null) {
                                this.idsUsersOnProject.push(user.id);
                            }
                        }
                    });
                })
            ).subscribe()
    }

    toggleButtonSaveNewMeetingPressed(isPressed: boolean) {
        this.isButtonSaveNewMeetingPressed = isPressed;
    }

    onSubmitNewMeeting() {
        let rawValues = this.form.getRawValue().newMeeting;
        let meeting: Meeting = {
            idSprint: this.idSprint,
            schedule: rawValues.schedule,
            description: rawValues.description,
            meetingUrl: rawValues.name
        };
        console.log(meeting);
        this.subscription = this.meetingService.addMeeting(meeting)
            .pipe(
                map(meeting => {
                    console.log(meeting);
                    if (meeting.id != null) {
                        this.idMeeting = meeting.id;
                    }
                    console.log(this.idsUsersOnProject);
                    for(let idUser of this.idsUsersOnProject) {
                        let participation: Participation = {
                            idMeeting: this.idMeeting,
                            idUser: idUser
                        }
                        this.participationService.addParticipation(participation).subscribe(result => {
                            console.log(result);
                        });
                    }
                }
            )
        ).subscribe();
    }
}
