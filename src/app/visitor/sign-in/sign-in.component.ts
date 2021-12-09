import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
    selector: 'app-sign-in',
    templateUrl: './sign-in.component.html',
    styleUrls: ['../../app.component.css', './sign-in.component.css']
})
export class SignInComponent implements OnInit {
    title: string = "Log in";

    buttonIsPressed: boolean = false;

    form:FormGroup = this.fb.group({
        main: this.fb.group({
            email:this.fb.control('', [
                Validators.required, Validators.email
            ]),
            password:this.fb.control('', Validators.required)
        })
    })

    constructor(private fb: FormBuilder) { }

    ngOnInit(): void {}

    sendData() {
        console.log(this.form.value);
    }

    autoComplete() {
        this.form.setValue({
            main:{
                email:"damien@gmail.com",
                password:"1234"
            }
        })
    }

    toggleButtonPress(isPressed:boolean) {
        if(isPressed) {
            this.buttonIsPressed = true;
        } else {
            this.buttonIsPressed = false;
        }
    }
}
