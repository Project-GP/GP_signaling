import {io} from "socket.io-client";
const socket = io("ws://localhost:3000");
var myIP = "1.2.3.4";
socket.emit("createRoom", myIP);//create Room and register my IP at signaling server
socket.emit("join", myIP);

socket.emit("testroom", String(myIP));
socket.on("roomTest", (answer) => {
    console.log(answer);
});

socket.on(myIP, (offer) => {
    console.log("reseive offer");
    //code of offer processing
    //create answer

    //socket.emit("answerOffer", answerOffer)
})