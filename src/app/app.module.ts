import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { AngularAgoraRtcModule, AgoraConfig } from 'angular-agora-rtc';

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
        AngularAgoraRtcModule.forRoot(agoraConfig)
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
