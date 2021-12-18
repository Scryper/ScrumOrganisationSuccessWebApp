import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import {AuthenticationService, UserService} from "../../../services";
import { ActivatedRoute, Router } from "@angular/router";
import { first } from "rxjs/operators";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['../../../app.component.css', './login.component.css']
})
export class LoginComponent implements OnInit {
    buttonIsPressed: boolean = false;
    loading: boolean = false;
    submitted: boolean = false;
    returnUrl: string = '/today';
    error: string  = '';
    isError:boolean=false;
    title: string = "Login";

    form:FormGroup = this.fb.group({
        main: this.fb.group({
            email: this.fb.control('', [
                Validators.required, Validators.email
            ]),
            password: this.fb.control('', Validators.required)
        })
    })

    constructor(private fb: FormBuilder,
                private authenticationService: AuthenticationService,
                private router: Router,
                private userService :UserService) {
        // redirect to home if already logged in
        if (this.authenticationService.currentUserValue) {
            this.router.navigate(['/login']);
        }
    }

    ngOnInit(): void { }

    autoComplete() {
        this.form.setValue({
            main:{
                email:"florian.mazzeo@gmail.com",
                password:"scryper"
            }
        });
    }

    toggleButtonPress(isPressed:boolean) {
        this.buttonIsPressed = isPressed;
    }

    get controls() { return this.form.controls; }

    onSubmit() {
        this.submitted = true;
        this.loading = true;
        let rawValue = this.form.getRawValue();

        let userObservable = this.authenticationService.login(rawValue.main.email, rawValue.main.password)
            .pipe(first())
            .subscribe(
                (result) => {
                    this.isError = false;
                    //need to change the route based on the role of the user
                    this.router.navigate([this.returnUrl]);
                },
                error => {
                    this.isError = true;
                    this.error = error;
                    this.loading = false;
                });
        //passer cet observable a l'autre component et unsubscribe puisqu'on a pu passer à la page suivante.
        //userObservable.unsubscribe();
    }
}
