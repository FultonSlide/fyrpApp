import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Http } from '@angular/http';
@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    constructor(private _httpService: Http, private router: Router) { }
    apiValues: string[] = [];
    loginReturnStatus: string;
    username: any;
    password: any;

    ngOnInit() {
        this._httpService.get('/api/values').subscribe(values => {
            this.apiValues = values.json() as string[];
        });
        this.loginRedirect();
    }

    getValues() {
        this._httpService.get('/api/values').subscribe(values => {
            console.log(values.json() as string[]);
        });
    }

    loginRedirect() {
        this.router.navigate(['/login']);
    }

    login($e) {
        this.username = $e.username;
        this.password = $e.password;
        console.log(this.username, this.password);
        this._httpService.post('/api/values', $e).subscribe(values => {
            console.log(values.json() as string[]);
            this.loginReturnStatus = values.json();
        });
        if (this.loginReturnStatus) {
            this.router.navigate(['']);
        } else {
            //return login error msg.
        }
    }
}
