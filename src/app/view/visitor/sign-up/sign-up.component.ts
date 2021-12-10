import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
    selector: 'app-sign-up',
    templateUrl: './sign-up.component.html',
    styleUrls: ['../../../app.component.css', './sign-up.component.css']
})

export class SignUpComponent implements OnInit {
    title: string = "Create an account";



    form:FormGroup = this.fb.group({
        main: this.fb.group({
            email:this.fb.control('', [
                Validators.required, Validators.email
            ]),
            password:this.fb.control('', Validators.required),
            confirmPassword:this.fb.control('', Validators.required)
        })
    })

    constructor(private fb: FormBuilder) { }

    ngOnInit(): void { }

    sendData() {
        console.log(this.form.value);
    }

    autoComplete() {
        this.form.setValue({
            main:{
                email:"damien@gmail.com",
                password:"1234",
                confirmPassword:"1234"
            }
        })
    }

    buttonIsPressed: boolean = false;

    toggleButtonPress(isPressed:boolean) {
        if(isPressed) {
            this.buttonIsPressed = true;
        } else {
            this.buttonIsPressed = false;
        }
    }

}
