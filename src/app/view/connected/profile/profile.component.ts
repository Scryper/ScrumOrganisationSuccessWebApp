import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthenticationService} from "../../../services";

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['../../../app.component.css', './profile.component.css']
})
export class ProfileComponent implements OnInit {
    private _lastName = '';
    private _firstName = '';
    private _email = '';

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

    })

    technologies = [
        "Angular",
        "React",
        "VueJS"
    ]

    constructor(private fb: FormBuilder,private authenticationService: AuthenticationService) { }

    ngOnInit(): void {
        this.authenticationService.currentUser.subscribe(()=>this.fillProfile());
    }

    sendData() {
        console.log(this.form.value);
    }

    toggleButtonPress(isPressed: boolean) {
        this.addChosenTechnologiesToForm();
        this.buttonIsPressed = isPressed;
    }

    fillProfile() {
        let currentUser = JSON.parse(<string>sessionStorage.getItem('currentUser'));
        if(currentUser != null) {
            this.form.controls['main'].setValue({
                lastName: currentUser.lastname,
                firstName: currentUser.firstname,
                email: currentUser.email
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

    selectedTechnology: string | undefined;
    ChosenTechnologies:string[] = [];
    addToChosenTechnologies() {
        if (this.selectedTechnology != null && !this.ChosenTechnologies.includes(this.selectedTechnology)) {
            this.ChosenTechnologies.push(this.selectedTechnology);
        }
    }

    assignToSelected(selected:string) {
        this.selectedTechnology = selected;
    }
}
