import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthenticationService} from "../../../services";
import {SosUser} from "../../../domain/sos-user";
import {Technology} from "../../../domain/technology";
import {TechnologiesService} from "../../../services/technologies/technologies.service";
import {DevelopersTechnologiesService} from "../../../services/developers-technologies/developers-technologies.service";

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['../../../app.component.css', './profile.component.css']
})
export class ProfileComponent implements OnInit {
    private _lastName = '';
    private _firstName = '';
    private _email = '';
    private idUser: number = 0;
    profilePicture: string | undefined = "./assets/images/profilePictures/anonym.jpg";
    selectedTechnology: string | undefined;
    chosenTechnologies: string[] = [];
    technologies: Technology[] = [];
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

    constructor(private fb: FormBuilder,
                private authenticationService: AuthenticationService,
                private technologyService: TechnologiesService,
                private developerTechnology: DevelopersTechnologiesService) { }

    ngOnInit(): void {
        this.authenticationService.currentUser.subscribe(user => this.fillProfile(user));
        this.loadAvailableTechnologies();
        this.loadUserTechnologies();
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
            if (user.id != null) {
                this.idUser = user.id;
            }
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
        for (let i = 0 ; i < this.chosenTechnologies.length ; i++) {
            main.addControl("T" + i, this.fb.control(this.chosenTechnologies[i], Validators.required));
        }
    }

    addToChosenTechnologies() {
        if (this.selectedTechnology != null && !this.chosenTechnologies.includes(this.selectedTechnology)) {
            this.chosenTechnologies.push(this.selectedTechnology);
        }
    }

    assignToSelected(selected:string) {
        this.selectedTechnology = selected;
    }

    private loadAvailableTechnologies() {
        this.technologyService.getAll().then(technologies => {
            for (let i = 0 ; i < technologies.length ; i++) {
                this.technologies.push(technologies[i]);
            }
        });
    }

    private loadUserTechnologies() {
        this.developerTechnology.getByDeveloperId(this.idUser).then(developerTechnologies => {
            for (let i = 0 ; i < developerTechnologies.length ; i++) {
                this.getTechnologyName(developerTechnologies[i].idTechnology);
            }
        });
    }

    private getTechnologyName(idTechnology: number) {
        this.technologyService.getById(idTechnology).then(technology => {
            this.chosenTechnologies.push(technology.name);
        });
    }
}
