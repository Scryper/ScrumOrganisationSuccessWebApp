import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import {UserService} from "../../../services";
import {SosUser} from "../../../domain/sos-user";

@Component({
    selector: 'app-additional-infos',
    templateUrl: './additional-infos.component.html',
    styleUrls: ['../../../app.component.css', './additional-infos.component.css']
})
export class AdditionalInfosComponent implements OnInit {
    typeUserNames:string[] = [
        "Developer",
        "ScrumMaster",
        "ProductOwner"
    ]
    title: string = "Additional Information";
    buttonIsPressed: boolean = false;

    form:FormGroup = this.fb.group({
        main: this.fb.group({
            lastname: this.fb.control('', Validators.required),
            firstname: this.fb.control('', Validators.required),
            birthdate: this.fb.control('', Validators.required),
            userType: this.fb.control('Developer')
        })
    })

    constructor(private fb: FormBuilder,
                private userService: UserService) { }

    ngOnInit(): void { }

    sendData() {
        let user: SosUser = {
            firstname: this.form.getRawValue().main.firstName,
            lastname: this.form.getRawValue().main.lastName,
            password: "abcd",
            email: "abcd",
            role: this.typeUserNames.indexOf(this.form.getRawValue().main.userType) + 1,
            birthdate: new Date()
        };

        this.userService.addUser(user).then(result => {
            if(result == null) {
                // TODO : handle
            }
        });
    }

    autoComplete() {
        this.form.setValue({
            main:{
                lastName:"Auversack",
                firstName:"Damien",
                userType:"Developer"
            }
        })
    }

    toggleButtonPress(isPressed:boolean) {
        this.buttonIsPressed = isPressed;
    }
}
