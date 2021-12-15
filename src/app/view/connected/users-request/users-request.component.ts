import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-users-request',
  templateUrl: './users-request.component.html',
  styleUrls: ['../../../app.component.css', './users-request.component.css']
})
export class UsersRequestComponent implements OnInit {

    requestUsers = [
        {
            name : "Damien",
            technology: [
                "Angular",
                "NodeJS"
            ]
        },
        {
            name : "Martin",
            technology: [
                "Bootstrap",
                "JS"
            ]
        },
        {
            name : "Florian",
            technology: [
                "PHP",
                "JAVA"
            ]
        },
        {
            name : "Floran",
            technology: [
                "C#",
                "C++"
            ]
        }
    ]

    constructor(private route: ActivatedRoute) { }

    ngOnInit(): void {
        this.nameProject = this.route.snapshot.paramMap.get("nameProject");
    }

    accept(item:any) {
        console.log("accept " + item);
    }

    refuse(item:any) {
        console.log("refuse " + item);
    }

    nameProject: string | null = "";


    buttonIsPressed: boolean = false;
    clicked: any;

    toggleButtonPress(isPressed:boolean) {
        this.buttonIsPressed = isPressed;
    }

}
