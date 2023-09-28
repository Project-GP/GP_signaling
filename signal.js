import { Server } from 'socket.io';

const io = new Server(3000);

var relayList = [];//relay node's list

io.on("connection", (rNode) => {
    console.log("connect success");
    rNode.on("requestList", (player) => {
        for(var i=0; i<relayList.length; i++)
        {
            rNode.emit("requestList", relayList[i]);//emit relay node's whole list to client
        }
    });

    rNode.on("createRoom", (roomName) => {
        relayList.push(roomName);//first, register this relay nodes name at relayList
        rNode.join(String(roomName));//after, Create room. room name is relay's public ip
        console.log("register and create room: " + roomName);
    });

    rNode.on("join", (roomName) => {//client request for join room (in relayList)
        if(String(roomName) !== String(relayList[0]))
        {
            console.log(roomName + " is noting");
        }
        rNode.join(String(roomName));
    });

    rNode.on("sendOffer", (offer) => {
        //extract destination to offer
        //io.to(destination).emit(destination, offer);
    });
    rNode.on("answerOffer", (answer) => {
        //extract source and destination
        //io.to(source).emit(destination, answer);
    });
    rNode.on("testroom", (roomName) => 
    {
        io.to(roomName).emit("roomTest", roomName + " connection ok?");
    });
});

io.on("rDisconnect", (player) => {
    for(var i=0; i<relayList; i++)
    {
        if(relayList[i] === player)
            relayList.splice(i, 1);//if disconnected relay, remove that relay's name to relayList
    }
});