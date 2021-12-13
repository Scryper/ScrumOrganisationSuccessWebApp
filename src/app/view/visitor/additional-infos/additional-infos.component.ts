import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import {UserService} from "../../../services";
import {SosUser} from "../../../domain/sos-user";
import {DatePipe} from "@angular/common";

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
    isMajor: boolean = true;

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
        let rawValues = this.form.getRawValue().main;
        let birthdateUser: Date = rawValues.birthdate;
        let user: SosUser = {
            firstname: rawValues.firstName,
            lastname: rawValues.lastName,
            password: "abcd",
            email: "abcd",
            role: this.typeUserNames.indexOf(rawValues.userType) + 1,
            birthdate: birthdateUser
        };

        let date: Date = new Date();
        let currentYear: number = new Date().getFullYear();
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

        if((currentYear - birthYear + offset) < 18) this.isMajor = false;

        if(this.isMajor) {
            this.userService.addUser(user).then(result => {
                if(result == null) {
                    // TODO : handle
                }
            });
        }
    }

    autoComplete() {
        let datePipe = new DatePipe('en-GB');
        let date = datePipe.transform(new Date(), 'dd/MM/yyyy');

        this.form.setValue({
            main:{
                lastname:"Auversack",
                firstname:"Damien",
                birthdate: date,
                userType:"Developer"
            }
        })
    }

    toggleButtonPress(isPressed:boolean) {
        this.buttonIsPressed = isPressed;
    }
}
