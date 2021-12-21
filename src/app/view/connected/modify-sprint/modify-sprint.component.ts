import { Component, OnInit } from '@angular/core';
import { Sprint} from "../../../domain/sprint";
import { SprintsService } from "../../../services/sprints/sprints.service";
import { ActivatedRoute } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { UserStory } from "../../../domain/user-story";
import { SprintsUserStoriesService } from "../../../services/sprints-user-stories/sprints-user-stories.service";
import { SprintUserStory } from "../../../domain/sprint-user-story";
import {UserStoriesService} from "../../../services/user-stories/user-stories.service";
import {UserService} from "../../../services";
import {MeetingsService} from "../../../services/meetings/meetings.service";
import {Meeting} from "../../../domain/meeting";
import {ParticipationService} from "../../../services/participation/participation.service";
import {Participation} from "../../../domain/participation";

@Component({
    selector: 'app-modify-sprint',
    templateUrl: './modify-sprint.component.html',
    styleUrls: ['../../../app.component.css', './modify-sprint.component.css']
})
export class ModifySprintComponent implements OnInit {
    isButtonSaveNewMeetingPressed: boolean = false;

    isInSprint: boolean[] = [];

    idSprint: number = 0;
    idMeeting: number = 0;
    idsUserStories: number[] = [];
    idsUsersOnProject: number[] = [];


    sprint: Sprint = {
        id: 0,
        description: "",
        deadline: new Date(),
        startDate: new Date(),
        sprintNumber: 0,
        idProject: 0
    };

    userStories: UserStory[] = [];

    form: FormGroup = this.fb.group({
        newMeeting: this.fb.group({
            schedule: this.fb.control('', Validators.required),
            name: this.fb.control('', Validators.required),
            description: this.fb.control('', Validators.required)
        })
    });

    constructor(private fb: FormBuilder,
                private sprintService: SprintsService,
                private route: ActivatedRoute,
                private sprintUserStoryService: SprintsUserStoriesService,
                private userStoryService: UserStoriesService,
                private userService: UserService,
                private meetingService: MeetingsService,
                private participationService: ParticipationService) { }

    ngOnInit(): void {
        this.loadSprint();
    }

    private loadSprint() {
        let idSprintAsString: string | null = this.route.snapshot.paramMap.get("sprintId");
        if (typeof idSprintAsString === "string") {
            this.idSprint = parseInt(idSprintAsString, 10); // cast to int because params are string by default
        }
        // this.sprintService.getById(this.idSprint).then(sprint => {
        //     if(sprint != undefined) { // security
        //         this.sprint = sprint;
        //         this.loadUsers();
        //         this.fillIdsUserStories(this.sprint.idProject);
        //     }
        // });
    }

    toggleButtonSaveNewMeetingPressed(isPressed: boolean) {
        this.isButtonSaveNewMeetingPressed = isPressed;
    }

    doDeleteOrAddUserStory(event: any, elt: UserStory) {
        if (elt.id != null) {
            if(event.target.checked) {
                this.addUserStory(elt.id);
            } else {
                this.deleteUserStory(elt.id);
            }
        }
    }

    addUserStory(idUserStory: number) {
        let sprintUserStory: SprintUserStory = {
            idSprint: this.sprint.id,
            idUserStory: idUserStory
        };
        this.sprintUserStoryService.addSprintUserStory(sprintUserStory);
    }

    deleteUserStory(idUserStory: number) {
        if (this.sprint.id != null) {
            this.sprintUserStoryService.deleteSprintUserStory(this.sprint.id, idUserStory);
        }
    }

    private fillIdsUserStories(idProject: number) {
        // get all user stories from the project
        this.getNameOfUserStories(idProject);
    }

    private getNameOfUserStories(idProject: number) {
        // this.userStoryService.getByIdProject(idProject).then(userStories => {
        //     for (let userStory of userStories) {
        //         if (userStory.id != null) {
        //             this.idsUserStories.push(userStory.id);
        //             this.userStories.push(userStory);
        //             this.verifyIfIsInSPrint(userStory.id);
        //         }
        //     }
        // });
    }

    private verifyIfIsInSPrint(id: number) {
        // this.sprintUserStoryService.getByIdUserStory(id).then(sprintUserStories => {
        //     for(let sprintUserStory of sprintUserStories) {
        //         this.isInSprint.push(sprintUserStory.idSprint == this.sprint.id);
        //     }
        // });
    }

    onSubmitNewMeeting() {
        let rawValues = this.form.getRawValue().newMeeting;
        let meeting: Meeting = {
            idSprint: this.sprint.id,
            schedule: rawValues.schedule,
            description: rawValues.description,
            meetingUrl: rawValues.name
        };
        // this.meetingService.addMeeting(meeting).then(meeting => {
        //     console.log(meeting);
        //     if (meeting.id != null) {
        //         this.idMeeting = meeting.id;
        //     }
        //     for(let idUser of this.idsUsersOnProject) {
        //         let participation: Participation = {
        //             idMeeting: this.idMeeting,
        //             idUser: idUser
        //         }
        //         this.participationService.addParticipation(participation).then(result => {
        //             console.log(result);
        //         });
        //     }
        // });
    }

    // load the users working on the project
    private loadUsers() {
        // this.userService.getByIdProject(this.sprint.idProject).then(users => {
        //     for(let user of users) {
        //         if (user.id != null) {
        //             this.idsUsersOnProject.push(user.id);
        //         }
        //     }
        // });
    }
}
