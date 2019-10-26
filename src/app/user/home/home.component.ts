import { Component, OnInit, ViewChild, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Http, Headers, RequestOptions } from '@angular/http';
import { AngularAgoraRtcService, Stream } from 'angular-agora-rtc';

import {
    AngularFireDatabase,
    AngularFireList
} from "angularfire2/database";
import { AngularFireAuth } from "angularfire2/auth";
import * as firebase from "firebase/app";

const SERVERS: any = {
    iceServers: [
        { urls: "stun:stun.services.mozilla.com" },
        { urls: "stun:stun.l.google.com:19302" }
    ]
};

const DEFAULT_CONSTRAINTS = {
    optional: []
};

declare let RTCPeerConnection: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
    pc: any;
    channel: AngularFireList<any[]>;
    database: firebase.database.Reference;
    user: firebase.User;
    senderId: string;

    @ViewChild("me", { static: false }) me: any;
    @ViewChild("remote", { static: false }) remote: any;

    //localStream: Stream
    //remoteCalls: any = [];

    constructor(private _httpService: Http, private router: Router, private agoraService: AngularAgoraRtcService, public afDb: AngularFireDatabase,
        public afAuth: AngularFireAuth) { }

    ngOnInit() {
        //this.agoraService.createClient();
        this.setupWebRtc();
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

    //startCall() {
    //    this.agoraService.client.join(null, '1000', null, (uid) => {
    //        this.localStream = this.agoraService.createStream(uid, true, null, null, true, false);
    //        this.localStream.setVideoProfile('720p_3');
    //        this.subscribeToStreams();
    //    });
    //}

    //API calls ^^^^^^

    setupWebRtc() {
        this.senderId = this.guid();
        var channelName = "/webrtc";
        this.channel = this.afDb.list(channelName);
        this.database = this.afDb.database.ref(channelName);

        this.database.on("child_added", this.readMessage.bind(this));
        this.pc = new RTCPeerConnection(SERVERS, DEFAULT_CONSTRAINTS);
        this.pc.onicecandidate = event =>
            event.candidate
                ? this.sendMessage(
                    this.senderId,
                    JSON.stringify({ ice: event.candidate })
                )
                : console.log("Sent All Ice");

        this.pc.ontrack = event =>
            (this.remote.nativeElement.srcObject = event.streams[0]); // use ontrack

        this.showMe();
    }

    sendMessage(senderId, data) {
        var msg = this.channel.push({
            sender: senderId,
            message: data
        });
        msg.remove();
    }

    readMessage(data) {
        if (!data) return;
        var msg = JSON.parse(data.val().message);
        var sender = data.val().sender;
        if (sender != this.senderId) {
            if (msg.ice != undefined)
                this.pc.addIceCandidate(new RTCIceCandidate(msg.ice));
            else if (msg.sdp.type == "offer")
                this.pc
                    .setRemoteDescription(new RTCSessionDescription(msg.sdp))
                    .then(() => this.pc.createAnswer())
                    .then(answer => this.pc.setLocalDescription(answer))
                    .then(() =>
                        this.sendMessage(
                            this.senderId,
                            JSON.stringify({ sdp: this.pc.localDescription })
                        )
                    );
            else if (msg.sdp.type == "answer")
                this.pc.setRemoteDescription(new RTCSessionDescription(msg.sdp));
        }
    }

    showMe() {
        navigator.mediaDevices
            .getUserMedia({ audio: true, video: true })
            .then(stream => (this.me.nativeElement.srcObject = stream))
            .then(stream => this.pc.addStream(stream));
    }

    showRemote() {
        this.pc
            .createOffer()
            .then(offer => this.pc.setLocalDescription(offer))
            .then(() =>
                this.sendMessage(
                    this.senderId,
                    JSON.stringify({ sdp: this.pc.localDescription })
                )
            );
    }

    guid() {
        return (
            this.s4() +
            this.s4() +
            "-" +
            this.s4() +
            "-" +
            this.s4() +
            "-" +
            this.s4() +
            "-" +
            this.s4() +
            this.s4() +
            this.s4()
        );
    }

    s4() {
        return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    }

    //Native WebRTC ^^^^^^

    //private subscribeToStreams() {
    //    this.localStream.on("accessAllowed", () => {
    //        console.log("accessAllowed");
    //    });
    //    // The user has denied access to the camera and mic.
    //    this.localStream.on("accessDenied", () => {
    //        console.log("accessDenied");
    //    });

    //    this.localStream.init(() => {
    //        console.log("getUserMedia successfully");
    //        this.localStream.play('agora_local');
    //        this.agoraService.client.publish(this.localStream, function (err) {
    //            console.log("Publish local stream error: " + err);
    //        });
    //        this.agoraService.client.on('stream-published', function (evt) {
    //            console.log("Publish local stream successfully");
    //        });
    //    }, function (err) {
    //        console.log("getUserMedia failed", err);
    //    });

    //    this.agoraService.client.on('error', (err) => {
    //        console.log("Got error msg:", err.reason);
    //        if (err.reason === 'DYNAMIC_KEY_TIMEOUT') {
    //            this.agoraService.client.renewChannelKey("", () => {
    //                console.log("Renew channel key successfully");
    //            }, (err) => {
    //                console.log("Renew channel key failed: ", err);
    //            });
    //        }
    //    });

    //    this.agoraService.client.on('stream-added', (evt) => {
    //        const stream = evt.stream;
    //        this.agoraService.client.subscribe(stream, (err) => {
    //            console.log("Subscribe stream failed", err);
    //        });
    //    });

    //    this.agoraService.client.on('stream-subscribed', (evt) => {
    //        const stream = evt.stream;
    //        if (!this.remoteCalls.includes(`agora_remote${stream.getId()}`)) this.remoteCalls.push(`agora_remote${stream.getId()}`);
    //        setTimeout(() => stream.play(`agora_remote${stream.getId()}`), 2000);
    //    });

    //    this.agoraService.client.on('stream-removed', (evt) => {
    //        const stream = evt.stream;
    //        stream.stop();
    //        this.remoteCalls = this.remoteCalls.filter(call => call !== `#agora_remote${stream.getId()}`);
    //        console.log(`Remote stream is removed ${stream.getId()}`);
    //    });

    //    this.agoraService.client.on('peer-leave', (evt) => {
    //        const stream = evt.stream;
    //        if (stream) {
    //            stream.stop();
    //            this.remoteCalls = this.remoteCalls.filter(call => call === `#agora_remote${stream.getId()}`);
    //            console.log(`${evt.uid} left from this channel`);
    //        }
    //    });
    // }
}
