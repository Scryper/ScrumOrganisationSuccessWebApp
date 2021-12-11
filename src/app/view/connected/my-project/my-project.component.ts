import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
    selector: 'app-my-project',
    templateUrl: './my-project.component.html',
    styleUrls: ['../../../app.component.css', './my-project.component.css']
})
export class MyProjectComponent implements OnInit {

    nameProject: string | null = "";

    constructor(private route: ActivatedRoute) { }

    ngOnInit(): void {
        this.nameProject = this.route.snapshot.paramMap.get("nameProject");
    }
}
