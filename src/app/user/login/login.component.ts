import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Http } from '@angular/http';
import { HttpHeaders } from '@angular/common/http';

export interface Details {
    username: string,
    password: string
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    loginDetails: any;
    usernameValue: string;
    passwordValue: string;
    loginReturnStatus: any;

    constructor(private _httpService: Http, private router: Router) { }

    ngOnInit(): void {
    }

    localLogin(): void {
        if (this.usernameValue == "WillQ" && this.passwordValue == "1234") {
            this.router.navigate(['/home']);
        }
    }

    login() {
        this.loginDetails = {
            username: this.usernameValue,
            password: this.passwordValue
        }

        let details: Details = {username: null, password: null};

        details.username = this.usernameValue;
        details.password = this.passwordValue;

        console.log(details);

        const headers: HttpHeaders = new HttpHeaders();
        headers.set('Content-Type', 'application/json');

        this._httpService.post('/api/values', details).subscribe(values => {
            console.log('return from api');
            console.log(values);
            this.loginReturnStatus = values;
        });

        if (this.loginReturnStatus == "Login Success") {
            this.router.navigate(['/home']);
        } else {
            //return login error msg.
        }
    }

}
