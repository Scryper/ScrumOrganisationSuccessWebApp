import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthenticationService, UserService } from "../../../services";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
    selector: 'app-sign-up',
    templateUrl: './sign-up.component.html',
    styleUrls: ['../../../app.component.css', './sign-up.component.css']
})
export class SignUpComponent implements OnInit {
    title: string = "Create an account";
    buttonIsPressed: boolean = false;
    returnUrl: string = 'AdditionalInfos';
    userExists: boolean = false;

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
                private authenticationService : AuthenticationService,
                private route: ActivatedRoute,
                private router : Router,
                private userService : UserService) { }

    ngOnInit(): void { }

    onSubmit() {
        //get the value of the email
        let email: string =this.form.getRawValue().main.email;
        let password: string = this.form.getRawValue().main.password;
        let passwordConfirmation: string = this.form . getRawValue().main.confirmPassword;

        //verify if the passwords are the same
        if(password == passwordConfirmation) {
            //verify if the email is in the database
            this.userService.getByEmail(email).then(result => {
                if(result == null) {
                    this.router.navigate([this.returnUrl]);
                }
                else {
                    this.userExists = true;
                }
            });
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
