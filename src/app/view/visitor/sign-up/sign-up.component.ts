import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthenticationService, UserService } from "../../../services";
import { ActivatedRoute, Router } from "@angular/router";
import {SignUpService} from "../../../services/sign-up/sign-up.service";
import {DatePipe} from "@angular/common";
import {SosUser} from "../../../domain/sos-user";

@Component({
    selector: 'app-sign-up',
    templateUrl: './sign-up.component.html',
    styleUrls: ['../../../app.component.css', './sign-up.component.css']
})
export class SignUpComponent implements OnInit {
    title: string = "Create an account";
    buttonIsPressed: boolean = false;
    userExists: boolean = false;
    differentPasswords: boolean = false;

    isMajor: boolean = true;

    typeUserNames:string[] = [
        "Developer",
        "ScrumMaster",
        "ProductOwner"
    ]

    form:FormGroup = this.fb.group({
        main: this.fb.group({
            email:this.fb.control('', [
                Validators.required, Validators.email
            ]),
            password:this.fb.control('', Validators.required),
            confirmPassword:this.fb.control('', Validators.required),
            lastname: this.fb.control('', Validators.required),
            firstname: this.fb.control('', Validators.required),
            birthdate: this.fb.control('', Validators.required),
            userType: this.fb.control('Developer')

        })
    })

    constructor(private fb: FormBuilder,
                private authenticationService : AuthenticationService,
                private route: ActivatedRoute,
                private router : Router,
                private userService : UserService,
                private signUpService : SignUpService) { }

    ngOnInit(): void { }

    onSubmit() {
        //reset the error messages
        this.userExists = false;
        this.userExists = false;

        //get the value of the email
        let email: string =this.form.getRawValue().main.email;
        let password: string = this.form.getRawValue().main.password;
        let passwordConfirmation: string = this.form.getRawValue().main.confirmPassword;

        //verify if the passwords are the same
        if(password == passwordConfirmation) {
            this.differentPasswords = false;
            this.signUpService.setValues(password, email);
            //verify if the email is in the database
            this.userService.getByEmail(email).then(result => {
                if(result == null) {
                    this.sendData();
                }
                else {
                    this.userExists = true;
                }
            });
        } else {
            this.differentPasswords = true;
        }

    }

    autoComplete() {
        let datePipe = new DatePipe('en-GB');
        let date = datePipe.transform(new Date(), 'yyyy-MM-dd');
        this.form.setValue({
            main:{
                email:"Florian@test.com",
                password:"test",
                confirmPassword:"test",
                lastname:"Florian",
                firstname:"test",
                birthdate: date,
                userType:"Developer"
            }
        })
    }

    toggleButtonPressed() {
        this.buttonIsPressed = !this.buttonIsPressed;
    }

    sendData() {
        let rawValues = this.form.getRawValue().main;
        let birthdateUser: Date = new Date(rawValues.birthdate);
        let user: SosUser = {
            firstname: rawValues.firstname,
            lastname: rawValues.lastname,
            password: this.signUpService.password,
            email: this.signUpService.email,
            role: this.typeUserNames.indexOf(rawValues.userType) + 1,
            birthdate: birthdateUser
        };

        let date: Date = new Date();
        let currentYear: number = date.getFullYear();
        let birthYear: number = birthdateUser.getFullYear();
        let offset: number;
        if(date.getMonth() < birthdateUser.getMonth()) {
            offset = -1;
        } else if(date.getMonth() == birthdateUser.getMonth()
            && date.getDay() < birthdateUser.getDay()) {
            offset = -1;
        }
        else {
            offset = 0;
        }

        this.isMajor = (currentYear - birthYear + offset) >= 18;

        if(this.isMajor) {
            this.userService.addUser(user).then(() => {
                this.router.navigate(['/login']);
            });
        }
    }
}
