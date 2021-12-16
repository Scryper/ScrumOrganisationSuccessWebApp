import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-backlog',
  templateUrl: './product-backlog.component.html',
  styleUrls: ['../../../app.component.css', './product-backlog.component.css']
})
export class ProductBacklogComponent implements OnInit {

    productBacklog = [
        "US 1 - Move Player",
        "US 2 - Fight Player",
        "US 3 - Defend Player",
        "US 4 - Special attack"
    ];

    constructor() {}

    ngOnInit(): void {

    }

}
