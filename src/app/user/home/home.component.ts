import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Http, Headers, RequestOptions } from '@angular/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    mediaStreamConstraints = {
        video: true,
    };

    // Video element where stream will be placed.
    localVideo = document.querySelector('video');

    // Local stream that will be reproduced on the video.
    localStream: any;

    constructor(private _httpService: Http, private router: Router) { }

    ngOnInit() {
        navigator.mediaDevices.getUserMedia(this.mediaStreamConstraints)
            .then(this.gotLocalMediaStream).catch(this.handleLocalMediaStreamError);
    }

    // Handles success by adding the MediaStream to the video element.
    gotLocalMediaStream(mediaStream) {
        this.localStream = mediaStream;
        this.localVideo.srcObject = mediaStream;
    }

    handleLocalMediaStreamError(error) {
        console.log('navigator.getUserMedia error: ', error);
    }

    startLocalStream() {
        navigator.mediaDevices.getUserMedia(this.mediaStreamConstraints)
            .then(this.gotLocalMediaStream).catch(this.handleLocalMediaStreamError);
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

    //SimpleWebRTC:

    leaveCall() {

    }

    startCall() {

    }
}
