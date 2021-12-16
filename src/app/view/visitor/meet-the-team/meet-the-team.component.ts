import { Component, OnInit } from '@angular/core';
import {SosUser} from "../../../domain/sos-user";
import {UserService} from "../../../services";

@Component({
    selector: 'app-meet-the-team',
    templateUrl: './meet-the-team.component.html',
    styleUrls: ['../../../app.component.css', './meet-the-team.component.css']
})
export class MeetTheTeamComponent implements OnInit {
    title: string = "Meet the team";
    team: SosUser[] = [
        {
            firstname: "",
            lastname: "",
            password: "",
            email: "",
            profilePicture: undefined,
            birthdate: new Date(),
            role: 0
        },
        {
            firstname: "",
            lastname: "",
            password: "",
            email: "",
            profilePicture: undefined,
            birthdate: new Date(),
            role: 0
        },
        {
            firstname: "",
            lastname: "",
            password: "",
            email: "",
            profilePicture: undefined,
            birthdate: new Date(),
            role: 0
        },
        {
            firstname: "",
            lastname: "",
            password: "",
            email: "",
            profilePicture: undefined,
            birthdate: new Date(),
            role: 0
        }
    ];

    constructor(private userService: UserService) { }

    ngOnInit(): void {
        this.initTeam();
    }

    private initTeam(): void {
        let mails: string[] = ["damsover@gmail.com", "martin.maes100.000@gmail.com", "la199788@student.helha.be",
            "florian.mazzeo@gmail.com"];

        for(let i = 0 ; i < mails.length ; i++) {
            this.userService.getByEmail(mails[i]).then(user => {
                this.team[i].firstname = user.firstname;
                this.team[i].lastname = user.lastname;
                this.team[i].email = user.email;
                this.team[i].profilePicture = user.profilePicture;
            });
        }
    }
}
