import {io} from "socket.io-client";
//import {RTCPeerConnection} from "webrtc";
const socket = io("ws://localhost:3000");//signaling server address
var relayList = [];

socket.emit("requestList", "adsf");//receive relay node list
socket.on("requestList", (arg) => {
    relayList = [];
    relayList.push(arg);
    console.log(relayList[0]);
    socket.emit("join", relayList[0]);
    socket.emit("testroom", String(relayList[0]));
});

socket.on("roomTest", (answer) => {
    console.log(answer);
});




//const peer = new RTCPeerConnection;
//peer.createOffer();
//offer create
//source: my id or ip
//destination: one of the relayList
//socket.emit(destination, created offer); //send offer

//socket.on(myip, answer => { ... }); //receive answer