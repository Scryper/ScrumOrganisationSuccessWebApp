import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
    selector: 'app-create-project',
    templateUrl: './create-project.component.html',
    styleUrls: ['../../../app.component.css', './create-project.component.css']
})
export class CreateProjectComponent implements OnInit {

    title: string = "Create project";

    form:FormGroup = this.fb.group({
        main: this.fb.group({
            nameProject:this.fb.control('', Validators.required),
            deadline:this.fb.control('', Validators.required),
            description:this.fb.control('', Validators.required),
            repositoryURL:this.fb.control('', Validators.required)
        })
    })

    constructor(private fb: FormBuilder) { }

    ngOnInit(): void {
    }

    sendData() {
        console.log(this.form.value);
    }

    buttonIsPressed: boolean = false;

    toggleButtonPress(isPressed:boolean) {
        this.buttonIsPressed = isPressed;
    }
}
