import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    @Output() loginEvent = new EventEmitter();
    loginDetails: any;
    usernameValue: string;
    passwordValue: string;

    constructor() { }

    ngOnInit(): void {
    }

    login(): void {
        console.log(this.usernameValue);
        console.log(this.passwordValue);
        this.loginDetails = {
            "username": this.usernameValue,
            "password": this.passwordValue
        }
        this.loginEvent.emit(this.loginDetails);
    }

}
