import socketClient from '../socketClient';

class Peer {
    localMediaStream = null;
    rtc = null;
    mediaStreams = [];
    id = null;

    rtcConf = {
        'iceServers': [
            {url: 'stun:stun01.sipphone.com'},
            {url: 'stun:stun.ekiga.net'},
            {url: 'stun:stun.fwdnet.net'},
            {url: 'stun:stun.ideasip.com'},
            {url: 'stun:stun.iptel.org'},
            {url: 'stun:stun.rixtelecom.se'},
            {url: 'stun:stun.schlund.de'},
            {url: 'stun:stun.l.google.com:19302'},
            {url: 'stun:stun1.l.google.com:19302'},
            {url: 'stun:stun2.l.google.com:19302'},
            {url: 'stun:stun3.l.google.com:19302'},
            {url: 'stun:stun4.l.google.com:19302'},
            {url: 'stun:stunserver.org'},
            {url: 'stun:stun.softjoys.com'},
            {url: 'stun:stun.voiparound.com'},
            {url: 'stun:stun.voipbuster.com'},
            {url: 'stun:stun.voipstunt.com'},
            {url: 'stun:stun.voxgratia.org'},
            {url: 'stun:stun.xten.com'}
        ]
    };

    constructor(id) {
        this.id = id;
    }

    onLeave() {

    }

    onOffer() {
        this.rtc
    }

    onAnswer() {

    }

    resetPeer() {
        this.mediaStreams = [];
        this.localMediaStream = null;
        this.rtc.close();
        this.rtc.onicecandidate = null;
        this.rtc.onaddstream = null;

        this.setupPeerConnection();
    }

    createCall() {

    }

    endCall() {

    }

    onCandidate() {

    }

    isBusyRtc() {

    }

    isBusyMediaStream () {

    }

    setupPeerConnection() {
        this.rtc = new RTCPeerConnection(this.rtcConf);
        this.rtc.onaddstream = this.onAddStream;
    }

    onAddStream(e) {
        this.mediaStreams.push();
    }
}

export default Peer;