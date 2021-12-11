import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthenticationService } from "../../../service";
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
    returnUrl: string = '/tutorial';
    error: string  = '';
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
                private route: ActivatedRoute,
                private router: Router) {
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
        })
    }

    toggleButtonPress(isPressed:boolean) {
        this.buttonIsPressed = isPressed;
    }

    get controls() { return this.form.controls; }

    onSubmit() {
        this.submitted = true;
        this.loading = true;
        let rawValue = this.form.getRawValue();
        this.authenticationService.login(rawValue.main.email, rawValue.main.password)
            .pipe(first())
            .subscribe(
                () => {
                    this.router.navigate([this.returnUrl])
                },
                error => {
                    this.error = error;
                    this.loading = false;
                });
    }
}