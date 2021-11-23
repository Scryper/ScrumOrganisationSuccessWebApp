import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['../../app.component.css', './faq.component.css']
})
export class FaqComponent implements OnInit {

    title:string = "FAQ";

  constructor() { }

  ngOnInit(): void {
  }

}
