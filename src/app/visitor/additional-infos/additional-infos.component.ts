import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
    selector: 'app-additional-infos',
    templateUrl: './additional-infos.component.html',
    styleUrls: ['../../app.component.css', './additional-infos.component.css']
})
export class AdditionalInfosComponent implements OnInit {
    typeUserNames:string[] = [
        "Developer",
        "ScrumMaster",
        "ProductOwner"
    ]
    title: string = "Additional Information";
    buttonIsPressed: boolean = false;

    form:FormGroup = this.fb.group({
        main: this.fb.group({
            lastName:this.fb.control('', Validators.required),
            firstName:this.fb.control('', Validators.required),
            userType:this.fb.control('Developer')
        })
    })

    constructor(private fb: FormBuilder) { }

    ngOnInit(): void { }

    sendData() {
        console.log(this.form.value);
    }

    autoComplete() {
        this.form.setValue({
            main:{
                lastName:"Auversack",
                firstName:"Damien",
                userType:"Developer"
            }
        })
    }

    toggleButtonPress(isPressed:boolean) {
        this.buttonIsPressed = isPressed;
    }
}
