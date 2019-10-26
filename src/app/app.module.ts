import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { AngularAgoraRtcModule, AgoraConfig } from 'angular-agora-rtc';
import { AngularFireModule } from "angularfire2";
import { AngularFireDatabaseModule } from "angularfire2/database";
import { AngularFireAuthModule } from "angularfire2/auth";

import { environment } from "../environments/environment";

import { AppRoutingModule, routingComponents, appRoutes } from './app-routing.module';

const agoraConfig: AgoraConfig = {
    AppID: 'c85392e66cec446eb2328779f7c5a912',
};

@NgModule({
    declarations: [
        AppComponent,
        routingComponents
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        RouterModule.forRoot(appRoutes),
        AngularAgoraRtcModule.forRoot(agoraConfig),
        AngularFireModule.initializeApp(environment.firebase, environment.appName),
        AngularFireDatabaseModule,
        AngularFireAuthModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
