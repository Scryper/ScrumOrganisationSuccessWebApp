import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthenticationService} from "../../../service/authentication.service";
import {first} from "rxjs/operators";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
    selector: 'app-sign-in',
    templateUrl: './sign-in.component.html',
    styleUrls: ['../../../app.component.css', './sign-in.component.css']
})
export class SignInComponent implements OnInit {

    buttonIsPressed: boolean = false;
    loading = false;
    submitted = false;
    returnUrl: string="";
    error = '';

    form:FormGroup = this.fb.group({
        main: this.fb.group({
            email:this.fb.control('', [
                Validators.required, Validators.email
            ]),
            password:this.fb.control('', Validators.required)
        })
    })

    constructor(private fb: FormBuilder,
                private authenticationService: AuthenticationService,
                private route: ActivatedRoute,
                private router: Router,) {
        // redirect to home if already logged in
        if (this.authenticationService.currentUserValue) {
            this.router.navigate(['/']);
        }
    }

    ngOnInit(): void {
        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

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

    get controls() { return this.form.controls; }

    onSubmit() {
        this.submitted = true;
        this.loading = true;
        this.authenticationService.login(this.controls.username.value, this.controls.password.value)
            .pipe(first())
            .subscribe(
                data => {
                    this.router.navigate([this.returnUrl]);
                },
                error => {
                    this.error = error;
                    this.loading = false;
                });
    }
}
