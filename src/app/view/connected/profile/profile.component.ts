import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthenticationService} from "../../../services";

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['../../../app.component.css', './profile.component.css']
})
export class ProfileComponent implements OnInit {
    private _lastName = '';
    private _firstName = '';
    private _email = '';

    isEditButtonHidden: boolean = true;
    buttonIsPressed: boolean = false;

    form:FormGroup = this.fb.group({
        main: this.fb.group({
            lastName:this.fb.control(this._lastName, Validators.required),
            firstName:this.fb.control(this._firstName, Validators.required),
            email:this.fb.control({value:this._email, disabled: true}, Validators.required)
        })
    })

    constructor(private fb: FormBuilder,private authenticationService: AuthenticationService) { }

    ngOnInit(): void {
        this.authenticationService.currentUser.subscribe(()=>this.fillProfile());
    }

    sendData() {
        console.log(this.form.value);
    }

    toggleButtonPress(isPressed: boolean) {
        this.buttonIsPressed = isPressed;
    }

    fillProfile() {
        let currentUser = JSON.parse(<string>localStorage.getItem('currentUser'));
        if(currentUser != null) {
            this.form.controls['main'].setValue({
                lastName: currentUser.lastname,
                firstName: currentUser.firstname,
                email: currentUser.email
            });
        } else {
            this.form.controls['main'].setValue({
                lastName: "",
                firstName: "",
                email: ""
            });
        }
    }
}
