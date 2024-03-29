import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Http } from '@angular/http';
@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    constructor(private router: Router) { }
    apiValues: string[] = [];

    ngOnInit() {
        if (window.location.href == 'https://fyrpapp.azurewebsites.net/') {
            this.router.navigate(['/login']);
        }
    }
}
