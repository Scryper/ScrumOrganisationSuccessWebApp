import { NgModule } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import {AuthenticationService, UserService} from "../../../service";
import {ActivatedRoute, Router} from "@angular/router";
import {SosUser} from "../../../domain/SosUser";

@Component({
    selector: 'app-sign-up',
    templateUrl: './sign-up.component.html',
    styleUrls: ['../../../app.component.css', './sign-up.component.css']
})

export class SignUpComponent implements OnInit {
    title: string = "Create an account";
    buttonIsPressed: boolean = false;

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
                private userService : UserService) { }

    ngOnInit(): void { }

    onSubmit() {
        let email=this.form.getRawValue().main.email;
        this.userService.findByEmail(email)
            .subscribe((data)=> {
                if(data!=null){
                    console.log(data);
                }else{
                    console.log("pas trouvé");
                }
            });
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
