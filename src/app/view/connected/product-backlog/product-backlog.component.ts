import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-product-backlog',
    templateUrl: './product-backlog.component.html',
    styleUrls: ['../../../app.component.css', './product-backlog.component.css']
})
export class ProductBacklogComponent implements OnInit {
    productBacklog: string[] = [];

    constructor() {}

    ngOnInit(): void {

    }
}
