import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthenticationService} from "../../../services";
import {SosUser} from "../../../domain/sos-user";

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['../../../app.component.css', './profile.component.css']
})
export class ProfileComponent implements OnInit {
    private _lastName = '';
    private _firstName = '';
    private _email = '';
    profilePicture: string | undefined = "anonym";

    isEditButtonHidden: boolean = true;
    buttonIsPressed: boolean = false;

    form:FormGroup = this.fb.group({
        main: this.fb.group({
            lastName:this.fb.control(this._lastName, Validators.required),
            firstName:this.fb.control(this._firstName, Validators.required),
            email:this.fb.control({value:this._email, disabled: true}, Validators.required)
        })
    });

    constructor(private fb: FormBuilder,private authenticationService: AuthenticationService) { }

    ngOnInit(): void {
        this.authenticationService.currentUser.subscribe(user => this.fillProfile(user));
    }

    sendData() {
        console.log(this.form.value);
    }

    toggleButtonPress(isPressed: boolean) {
        this.buttonIsPressed = isPressed;
    }

    fillProfile(user: SosUser) {
        this.profilePicture = user.profilePicture;
        this.form.controls['main'].setValue({
            lastName: user.lastname,
            firstName: user.firstname,
            email: user.email
        });
    }
}
