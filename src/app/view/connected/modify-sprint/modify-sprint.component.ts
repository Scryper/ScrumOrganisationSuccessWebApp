import { Component, OnInit } from '@angular/core';
import {Sprint} from "../../../domain/sprint";
import {SprintsService} from "../../../services/sprints/sprints.service";
import {ActivatedRoute} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserStory} from "../../../domain/user-story";
import {Technology} from "../../../domain/technology";
import {DeveloperTechnology} from "../../../domain/developer-technology";

@Component({
    selector: 'app-modify-sprint',
    templateUrl: './modify-sprint.component.html',
    styleUrls: ['../../../app.component.css', './modify-sprint.component.css']
})
export class ModifySprintComponent implements OnInit {
    isButtonPressed: boolean = false;

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
        newDeadline: this.fb.group({
            deadline: this.fb.control('', Validators.required)
        }),
        newMeeting: this.fb.group({
            schedule: this.fb.control('', Validators.required),
            description: this.fb.control('', Validators.required)
        })
    });

    constructor(private fb: FormBuilder,
                private sprintService: SprintsService,
                private route: ActivatedRoute) { }

    ngOnInit(): void {
        this.loadSprint();
    }

    private loadSprint() {
        let idSprintAsString: string | null = this.route.snapshot.paramMap.get("sprintId");
        let idSprint: number = 0;
        if (typeof idSprintAsString === "string") {
            idSprint = parseInt(idSprintAsString, 10); // cast to int because params are string by default
        }
        this.sprintService.getById(idSprint).then(sprint => {
            if(sprint != undefined) { // security
                this.sprint = sprint;
            }
        });
    }

    onSubmit() {

    }

    toggleButtonPressed(isPressed: boolean) {
        this.isButtonPressed = isPressed;
    }

    doDeleteOrAddUserStory(event:any, elt:Technology) {
        if(event.target.checked) {
            this.addTechnology(elt.id);
        } else {
            this.deleteTechnology(elt.id);
        }
    }

    addTechnology(idTechnology: number) {
        let tmpDeveloperTechnology:DeveloperTechnology = {
            idUser:this.idUser,
            idTechnology:idTechnology
        };
        this.developerTechnology.addDeveloperTechnology(tmpDeveloperTechnology).then((elt) => {

        });
    }

    deleteTechnology(idTechnology: number) {
        this.developerTechnology.deleteDeveloperTechnology(this.idUser, idTechnology).then((elt) => {

        });
    }
}
