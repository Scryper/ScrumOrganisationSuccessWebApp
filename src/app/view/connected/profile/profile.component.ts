import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['../../../app.component.css', './profile.component.css']
})
export class ProfileComponent implements OnInit {
    isEditButtonHidden: boolean = true;
    buttonIsPressed: boolean = false;

    form:FormGroup = this.fb.group({
        main: this.fb.group({
            lastName:this.fb.control('Auversack', Validators.required),
            firstName:this.fb.control('Damien', Validators.required),
            email:this.fb.control({value:"damien@me.com", disabled: true}, Validators.required)
        })
    })

    constructor(private fb: FormBuilder) { }

    ngOnInit(): void { }

    sendData() {
        console.log(this.form.value);
    }

    toggleButtonPress(isPressed: boolean) {
        this.buttonIsPressed = isPressed;
    }
}
