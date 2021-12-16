import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-create-sprint',
  templateUrl: './create-sprint.component.html',
  styleUrls: ['../../../app.component.css', './create-sprint.component.css']
})
export class CreateSprintComponent implements OnInit {

    title: string = "Create sprint";
    selectedUserStory: string | undefined;
    ChosenUserStories:string[] = [];
    buttonIsPressed: boolean = false;

    form:FormGroup = this.fb.group({
        main: this.fb.group({
            deadline:this.fb.control('', Validators.required),
            description:this.fb.control('', Validators.required)
        })
    });

    productBacklog = [
        "US 1 - Move Player",
        "US 2 - Fight Player",
        "US 3 - Defend Player",
        "US 4 - Special attack"
    ];

    constructor(private fb: FormBuilder) {}
    ngOnInit(): void {}

    addToChosenUserStories() {
        if (this.selectedUserStory != null && !this.ChosenUserStories.includes(this.selectedUserStory)) {
            this.ChosenUserStories.push(this.selectedUserStory);
        }
    }

    assignToSelected(selected:string) {
        this.selectedUserStory = selected;
    }

    addChosenUserStoriesToForm() {
        const main = this.form.get(`main`) as FormGroup;
        let i = 0;
        for(let elt of this.ChosenUserStories) {
            i++;
            main.addControl("US"+i, this.fb.control(elt, Validators.required))
        }
    }

    sendData() {
        this.addChosenUserStoriesToForm();
        console.log(this.form.value);
    }

    toggleButtonPress(isPressed:boolean) {
        this.buttonIsPressed = isPressed;
    }

}
