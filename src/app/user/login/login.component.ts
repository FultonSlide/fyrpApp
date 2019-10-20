import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Http } from '@angular/http';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    loginDetails: any;
    usernameValue: string;
    passwordValue: string;
    loginReturnStatus: string;

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

        let loginDetailsJSON = JSON.stringify(this.loginDetails);

        console.log(loginDetailsJSON);

        const headers: HttpHeaders = new HttpHeaders();
        headers.set('Content-Type', 'application/json');

        this._httpService.post('/api/values', loginDetailsJSON).subscribe(values => {
            console.log(values.json());
            this.loginReturnStatus = values.json();
        });

        if (this.loginReturnStatus) {
            this.router.navigate(['/home']);
        } else {
            //return login error msg.
        }
    }

}
