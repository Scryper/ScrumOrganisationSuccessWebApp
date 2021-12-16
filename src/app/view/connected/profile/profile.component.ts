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
    profilePicture: string | undefined = "./assets/images/profilePictures/anonym.jpg";
    selectedTechnology: string | undefined;
    ChosenTechnologies: string[] = [];
    isEditButtonHidden: boolean = true;
    buttonIsPressed: boolean = false;

    form:FormGroup = this.fb.group({
        main: this.fb.group({
            lastName:this.fb.control(this._lastName, Validators.required),
            firstName:this.fb.control(this._firstName, Validators.required),
            email:this.fb.control({value:this._email, disabled: true}, Validators.required)
        }),
        technology: this.fb.group({
         })
    });

    technologies = [
        "Angular",
        "React",
        "VueJS"
    ];

    constructor(private fb: FormBuilder,
                private authenticationService: AuthenticationService) { }

    ngOnInit(): void {
        this.authenticationService.currentUser.subscribe(user => this.fillProfile(user));
    }

    sendData() {
        console.log(this.form.value);
    }

    toggleButtonPress(isPressed: boolean) {
        this.addChosenTechnologiesToForm();
        this.buttonIsPressed = isPressed;
    }

    fillProfile(user: SosUser) {
        if(user != null) {
            this.profilePicture = user.profilePicture;
            this.form.controls['main'].setValue({
                lastName: user.lastname,
                firstName: user.firstname,
                email: user.email
            });
        } else {
            this.form.controls['main'].setValue({
                lastName: "",
                firstName: "",
                email: ""
            });
        }
    }

    addChosenTechnologiesToForm() {
        const main = this.form.get(`technology`) as FormGroup;
        let i = 0;
        for(let elt of this.ChosenTechnologies) {
            i++;
            main.addControl("T"+i, this.fb.control(elt, Validators.required))
        }
    }

    addToChosenTechnologies() {
        if (this.selectedTechnology != null && !this.ChosenTechnologies.includes(this.selectedTechnology)) {
            this.ChosenTechnologies.push(this.selectedTechnology);
        }
    }

    assignToSelected(selected:string) {
        this.selectedTechnology = selected;
    }
}
