import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Http, Headers, RequestOptions } from '@angular/http';
import { AngularAgoraRtcService, Stream } from 'angular-agora-rtc';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    localStream: Stream
    remoteCalls: any = [];

    constructor(private _httpService: Http, private router: Router, private agoraService: AngularAgoraRtcService) { }

    ngOnInit() {
        this.agoraService.createClient();
    }

    stop() {
        const headers = new Headers({ 'Content-Type': 'application/json; charset=utf-8' });
        const options = new RequestOptions({ headers: headers });
        let token = 'stop';

        this._httpService.post('/api/values', `"${token}"`, {
            headers: headers
        }).subscribe(values => {
            console.log('Stopping...');
        });
    }

    forward() {
        const headers = new Headers({ 'Content-Type': 'application/json; charset=utf-8' });
        const options = new RequestOptions({ headers: headers });
        let token = 'forward';

        this._httpService.post('/api/values', `"${token}"`, {
            headers: headers
        }).subscribe(values => {
            console.log('Going forward...');
        });
    }

    backward() {
        const headers = new Headers({ 'Content-Type': 'application/json; charset=utf-8' });
        const options = new RequestOptions({ headers: headers });
        let token = 'backward';

        this._httpService.post('/api/values', `"${token}"`, {
            headers: headers
        }).subscribe(values => {
            console.log('Going backward...');
        });
    }

    left() {
        const headers = new Headers({ 'Content-Type': 'application/json; charset=utf-8' });
        const options = new RequestOptions({ headers: headers });
        let token = 'left';

        this._httpService.post('/api/values', `"${token}"`, {
            headers: headers
        }).subscribe(values => {
            console.log('Going left...');
        });
    }

    right() {
        const headers = new Headers({ 'Content-Type': 'application/json; charset=utf-8' });
        const options = new RequestOptions({ headers: headers });
        let token = 'right';

        this._httpService.post('/api/values', `"${token}"`, {
            headers: headers
        }).subscribe(values => {
            console.log('Going right...');
        });
    }

    refresh() {
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.onSameUrlNavigation = 'reload';
        this.router.navigate(['/home']);
    }

    startCall() {
        this.agoraService.client.join(null, '1000', null, (uid) => {
            this.localStream = this.agoraService.createStream(uid, true, null, null, true, false);
            this.localStream.setVideoProfile('720p_3');
            this.subscribeToStreams();
        });
    }

    private subscribeToStreams() {
        this.localStream.on("accessAllowed", () => {
            console.log("accessAllowed");
        });
        // The user has denied access to the camera and mic.
        this.localStream.on("accessDenied", () => {
            console.log("accessDenied");
        });

        this.localStream.init(() => {
            console.log("getUserMedia successfully");
            this.localStream.play('agora_local');
            this.agoraService.client.publish(this.localStream, function (err) {
                console.log("Publish local stream error: " + err);
            });
            this.agoraService.client.on('stream-published', function (evt) {
                console.log("Publish local stream successfully");
            });
        }, function (err) {
            console.log("getUserMedia failed", err);
        });

        this.agoraService.client.on('error', (err) => {
            console.log("Got error msg:", err.reason);
            if (err.reason === 'DYNAMIC_KEY_TIMEOUT') {
                this.agoraService.client.renewChannelKey("", () => {
                    console.log("Renew channel key successfully");
                }, (err) => {
                    console.log("Renew channel key failed: ", err);
                });
            }
        });

        this.agoraService.client.on('stream-added', (evt) => {
            const stream = evt.stream;
            this.agoraService.client.subscribe(stream, (err) => {
                console.log("Subscribe stream failed", err);
            });
        });

        this.agoraService.client.on('stream-subscribed', (evt) => {
            const stream = evt.stream;
            if (!this.remoteCalls.includes(`agora_remote${stream.getId()}`)) this.remoteCalls.push(`agora_remote${stream.getId()}`);
            setTimeout(() => stream.play(`agora_remote${stream.getId()}`), 2000);
        });

        this.agoraService.client.on('stream-removed', (evt) => {
            const stream = evt.stream;
            stream.stop();
            this.remoteCalls = this.remoteCalls.filter(call => call !== `#agora_remote${stream.getId()}`);
            console.log(`Remote stream is removed ${stream.getId()}`);
        });

        this.agoraService.client.on('peer-leave', (evt) => {
            const stream = evt.stream;
            if (stream) {
                stream.stop();
                this.remoteCalls = this.remoteCalls.filter(call => call === `#agora_remote${stream.getId()}`);
                console.log(`${evt.uid} left from this channel`);
            }
        });
    }
}
