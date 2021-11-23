import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-meet-the-team',
  templateUrl: './meet-the-team.component.html',
  styleUrls: ['../../app.component.css', './meet-the-team.component.css']
})
export class MeetTheTeamComponent implements OnInit {

    team:any = [
        {
            imgProfil: "imgDamien",
            email: "Damien@gmail.com",
            imgSocialNetwork: "linkedinLogo"
        },
        {
            imgProfil: "imgMartin",
            email: "Martin@gmail.com",
            imgSocialNetwork: "linkedinLogo"
        },
        {
            imgProfil: "imgFlorian",
            email: "Florian@gmail.com",
            imgSocialNetwork: "linkedinLogo"
        },
        {
            imgProfil: "imgFloran",
            email: "Floran@gmail.com",
            imgSocialNetwork: "linkedinLogo"
        }
    ];

    /*imgsTeam:any = [
        {
            img: "imgDamien"
        },
        {
            img: "imgMartin"
        },
        {
            img: "imgFlorian"
        },
        {
            img: "imgFloran"
        }
    ];

    emails:any = [
        {
            email: "Damien@gmail.com"
        },
        {
            email: "Martin@gmail.com"
        },
        {
            email: "Florian@gmail.com"
        },
        {
            email: "Floran@gmail.com"
        }
    ];

    imgsSocialNetwork:any = [
        {
            img: "linkedinLogo"
        },
        {
            img: "linkedinLogo"
        },
        {
            img: "linkedinLogo"
        },
        {
            img: "linkedinLogo"
        }
    ];*/

    title:string = "Meet the team";

  constructor() { }

  ngOnInit(): void {
  }

}
