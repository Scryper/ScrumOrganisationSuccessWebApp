import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthenticationService, UserService} from "../../../services";
import {SosUser} from "../../../domain/sos-user";
import {Technology} from "../../../domain/technology";
import {TechnologiesService} from "../../../services/technologies/technologies.service";
import {UsersTechnologiesService} from "../../../services/users-technologies/users-technologies.service";
import {UserTechnology} from "../../../domain/user-technology";
import {Router} from "@angular/router";
import {Subscription} from "rxjs";
import {map} from "rxjs/operators";

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['../../../app.component.css', './profile.component.css']
})
export class ProfileComponent implements OnInit, OnDestroy {
    private subscription: Subscription | undefined;

    private _lastName = '';
    private _firstName = '';
    email = '';
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
            firstName: this.fb.control(this._firstName, Validators.required)
        })
    });
    private otherSubscription: Subscription |undefined;

    constructor(private fb: FormBuilder,
                private authenticationService: AuthenticationService,
                private technologyService: TechnologiesService,
                private userTechnology: UsersTechnologiesService,
                private userService: UserService,
                private route: Router) { }

    ngOnDestroy() {
        this.subscription?.unsubscribe();
        this.otherSubscription?.unsubscribe();
    }

    ngOnInit(): void {
        this.fillProfile(JSON.parse(<string>localStorage.getItem('currentUser')));
        this.subscription = this.loadAvailableTechnologies().pipe(
            map(() => {
                this.fillIsHisTechnologies();
            })
        ).subscribe();
    }

    private loadAvailableTechnologies() {
        return this.technologyService.getAll().pipe(
            map(technologies => {
                for (let i = 0 ; i < technologies.length ; i++) {
                    this.technologies.push(technologies[i]);
                    this.idTechnologies.push(technologies[i].id);
                }
            })
        );
    }

    fillIsHisTechnologies() {
        this.userTechnology.getByUserId(this.idUser).subscribe(userTechnologies => {
            for (let userTechnology of userTechnologies) {
                let id: number = userTechnology.idTechnology;
                let result: boolean = this.idTechnologies.includes(id);
                let index: number = this.idTechnologies.indexOf(id);
                this.isHisTechnologies[index] = result;
            }
        });
    }

    toggleButtonPress(isPressed: boolean) {
        this.buttonIsPressed = isPressed;
    }

    fillProfile(user: SosUser) {
        this._lastName = user.lastname;
        this._firstName = user.firstname;
        this.email = user.email;

        if (user.id != null) {
            this.idUser = user.id;
        }
        this.profilePicture = user.profilePicture;
        this.form.controls['main'].setValue({
            lastName: user.lastname,
            firstName: user.firstname
        });
    }

    deleteTechnology(idTechnology: number) {
        this.otherSubscription = this.userTechnology.deleteUserTechnology(this.idUser, idTechnology).subscribe();
    }

    addTechnology(idTechnology: number) {
        let tmpUserTechnology: UserTechnology = {
            idUser: this.idUser,
            idTechnology: idTechnology
        };
        this.otherSubscription = this.userTechnology.addUserTechnology(tmpUserTechnology).subscribe();
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
            id: this.idUser,
            firstname: this.form.getRawValue().main.firstName,
            lastname: this.form.getRawValue().main.lastName,
            email: "",
            profilePicture: "",
            birthdate: new Date(),
            password: "",
            description: "",
            role: 0,
            token: "",
            portfolio: ""
        };
        this.otherSubscription = this.userService.updateFirstNameLastName(tmpUser).subscribe(() => {
                this.authenticationService.logout();
                this.route.navigate(['/login']);
        });
    }
}
