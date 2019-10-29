import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Http, Headers, RequestOptions } from '@angular/http';
import { AngularAgoraRtcService, Stream } from 'angular-agora-rtc';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    localStream: Stream
    remoteCalls: any = [];
    vidyoConnector: any;
    VC: any;

    constructor(private _httpService: Http, private router: Router, private agoraService: AngularAgoraRtcService) { }

    ngOnInit() {
        this.agoraService.createClient();
        this.loadVidyoClientLibrary();
    }

    ngAfterInit() {
        let status = {
            state: "READY",
        }
        this.onVidyoClientLoaded(status);
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

    //Vidyo
    loadVidyoClientLibrary() {
        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = 'https://static.vidyo.io/4.1.12.8/javascript/VidyoClient/VidyoClient.js?onload=onVidyoClientLoaded&webrtc=1&plugin=0';
        document.getElementsByTagName('head')[0].appendChild(script);
        console.log('loadVidyo');
    }

    onVidyoClientLoaded(status) {
        switch (status.state) {
            case "READY":
                console.log('onVidyoClientLoaded');
                var event = new CustomEvent('vidyoclient:ready', { detail: this.VC });
                document.dispatchEvent(event);
                break;
            case "RETRYING":             // The library operating is temporarily paused
                break;
            case "FAILED":               // The library operating has stopped
                break;
            case "FAILEDVERSION":
                break;
            case "NOTAVAILABLE":         // The library is not available
                break;
        }
        return true;                   // Return true to reload the plugins if not available
    }

    listenEvent() {
        document.addEventListener('vidyoclient:ready', (e: any) => {
            this.setupVidyoClient(e.detail);
            console.log('listenEvent');
        });
    }

    setupVidyoClient(VC) {
        console.log('setupVidyoClient');
        VC.CreateVidyoConnector({
            viewId: "renderer",   // HTML Div ID where the composited video will be rendered
            viewStyle: "VIDYO_CONNECTORVIEWSTYLE_Default", // Visual style of the composited renderer
            remoteParticipants: 16,                // Maximum number of participants
            logFileFilter: "warning all@VidyoConnector info@VidyoClient",
            logFileName: "",
            userData: ""
        }).then((vidyoConnector) => {
            this.vidyoConnector = vidyoConnector; // Save the vidyoConnector instance for later use
        }).catch(() => {
            console.error("CreateVidyoConnector Failed");
        });
    }

    joinCall() {
        this.vidyoConnector.Connect({
            host: "prod.vidyo.io",  // Server name, for most production apps it will be prod.vidyo.io
            token: "cHJvdmlzaW9uAFd2cUBiZGVkNWMudmlkeW8uaW8ANjM3Mzk1MjY3MTYAAGRhYWY4MDY5OWFlZDEyNzA3MzY1OTA4ZWExMjA0ODViODlhNTFkMzZiMGVkOWE1NmY0MGVlNWUzMThjNzc0NjlkYzFkYzEyMmMzNTQxZjdmMWRlNmQ2MmU3NDhmOTFmYQ==",          // Add generated token (https://developer.vidyo.io/documentation/4-1-16-8/getting-started#Tokens)
            displayName: "WillQTest",  // Display name
            resourceId: "demoRoom", // Room name
            onSuccess: function () {
                console.log("Connected!! YAY!");
            },
            onFailure: function (reason) {
                console.error("Connection failed");
            },
            onDisconnected: function (reason) {
                console.log(" disconnected - " + reason);
            }
        })
    }
    //AgoraRTC

    leaveCall() {
        this.agoraService.client.leave(function() {
            console.log("client leaves channel");
            //client ends call
        }, function (err) {
            console.log("client leave failed ", err);
            //error handling
        });

        this.localStream.stop('agora_local');
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
