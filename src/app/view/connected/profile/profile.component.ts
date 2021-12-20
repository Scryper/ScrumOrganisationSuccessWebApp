import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthenticationService, UserService} from "../../../services";
import {SosUser} from "../../../domain/sos-user";
import {Technology} from "../../../domain/technology";
import {TechnologiesService} from "../../../services/technologies/technologies.service";
import {DevelopersTechnologiesService} from "../../../services/developers-technologies/developers-technologies.service";
import {DeveloperTechnology} from "../../../domain/developer-technology";
import {Router} from "@angular/router";

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['../../../app.component.css', './profile.component.css']
})
export class ProfileComponent implements OnInit {
    private _lastName = '';
    private _firstName = '';
    private _email = '';
    idUser: number = 0;
    profilePicture: string | undefined = "./assets/images/profilePictures/anonym.jpg";

    technologies: Technology[] = [];
    isEditButtonHidden: boolean = true;
    buttonIsPressed: boolean = false;

    idTechnologies:number[] = [];
    isHisTechnologies:boolean[] = [];

    form:FormGroup = this.fb.group({
        main: this.fb.group({
            lastName: this.fb.control(this._lastName, Validators.required),
            firstName: this.fb.control(this._firstName, Validators.required),
            email: this.fb.control({value: this._email, disabled: true}, Validators.required)
        })
    });

    constructor(private fb: FormBuilder,
                private authenticationService: AuthenticationService,
                private technologyService: TechnologiesService,
                private developerTechnology: DevelopersTechnologiesService,
                private userService: UserService,
                private route: Router) { }

    ngOnInit(): void {
        this.fillProfile(JSON.parse(<string>localStorage.getItem('currentUser')));
        this.loadAvailableTechnologies();
        this.fillIdTechnologies();
    }

    fillIdTechnologies() {
        let tmpDeveloperTechnology:DeveloperTechnology[];
        this.developerTechnology.getByDeveloperId(this.idUser).then(developerTechnologies => {
            tmpDeveloperTechnology = developerTechnologies;
            for(let elt of tmpDeveloperTechnology) {
                this.idTechnologies.push(elt.idTechnology);
            }
            this.fillIsHisTechnologies();
        });
    }

    fillIsHisTechnologies() {
        for(let elt of this.technologies) {
            this.isHisTechnologies.push(this.idTechnologies.includes(elt.id));
        }
    }

    toggleButtonPress(isPressed: boolean) {
        this.buttonIsPressed = isPressed;
    }

    fillProfile(user: SosUser) {
        this._lastName = user.lastname;
        this._firstName = user.firstname;
        this._email = user.email;

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

    private loadAvailableTechnologies() {
        this.technologyService.getAll().then(technologies => {
            for (let i = 0 ; i < technologies.length ; i++) {
                this.technologies.push(technologies[i]);
            }
        });
    }

    deleteTechnology(idTechnology: number) {
        this.developerTechnology.deleteDeveloperTechnology(this.idUser, idTechnology).then((elt) => {

        });
    }

    addTechnology(idTechnology: number) {
        let tmpDeveloperTechnology:DeveloperTechnology = {
            idUser:this.idUser,
            idTechnology:idTechnology
        };
        this.developerTechnology.addDeveloperTechnology(tmpDeveloperTechnology).then((elt) => {

        });
    }

    doDeleteOrAddTechnology(event:any, elt:Technology) {
        if(event.target.checked) {
            this.addTechnology(elt.id);
        } else {
            this.deleteTechnology(elt.id);
        }
    }

    sendData() {
        let tmpUser:SosUser = {
            id:this.idUser,
            firstname:this.form.getRawValue().main.firstName,
            lastname:this.form.getRawValue().main.lastName,
            email:"",
            profilePicture:"",
            birthdate:new Date(),
            password:"",
            description:"",
            role:0,
            token:"",
            portfolio:""
        };
        if(confirm("You need to logout to save your changes.\nDo you want to logout ?")) {
            this.userService.updateFirstNameLastName(tmpUser).then((tmp) => {
                    this.authenticationService.logout();
                    this.route.navigate(['/login']);
            });
        }
    }
}
