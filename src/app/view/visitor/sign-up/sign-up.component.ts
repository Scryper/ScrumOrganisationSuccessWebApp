import { NgModule } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import {AuthenticationService, UserService} from "../../../service";
import {ActivatedRoute, Router} from "@angular/router";
import {SosUser} from "../../../domain/SosUser";
import {SignUpService} from "../../../service/sign-up/sign-up.service";
import {catchError} from "rxjs/operators";
import {HttpInterceptor} from "@angular/common/http";

@Component({
    selector: 'app-sign-up',
    templateUrl: './sign-up.component.html',
    styleUrls: ['../../../app.component.css', './sign-up.component.css']
})

export class SignUpComponent implements OnInit {
    title: string = "Create an account";
    buttonIsPressed: boolean = false;
    returnUrl: string = 'AdditionalInfos';

    form:FormGroup = this.fb.group({
        main: this.fb.group({
            email:this.fb.control('', [
                Validators.required, Validators.email
            ]),
            password:this.fb.control('', Validators.required),
            confirmPassword:this.fb.control('', Validators.required)
        })
    })


    constructor(private fb: FormBuilder,
                private authentcationService : AuthenticationService,
                private route: ActivatedRoute,
                private router : Router,
                private userService : UserService,
                private signupService : SignUpService) { }

    ngOnInit(): void { }

    onSubmit() {
        //get the value of the email
        let email=this.form.getRawValue().main.email;
        let psw1 = this.form.getRawValue().main.password;
        let psw2 = this.form . getRawValue().main.confirmPassword;

        //verify if the passwords are the same
        if(psw1==psw2){
            //verify if the email is in the database
            this.userService.findByEmail(email)
                .pipe()
                .subscribe(
                error=> {

                }
            );
        }
    }

    autoComplete() {
        this.form.setValue({
            main:{
                email:"florian.mazzeo@gmail.com",
                password:"1234",
                confirmPassword:"1234"
            }
        })
    }

    toggleButtonPress(isPressed:boolean) {
        this.buttonIsPressed = isPressed;
    }

}
