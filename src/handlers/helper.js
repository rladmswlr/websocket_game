import { CLIENT_VERSION } from "../constants.js";
import { createStage, getStage, setStage } from "../models/stage.model.js";
import { getUser, removeUser } from "../models/user.model.js"
import handlerMappings from "./handlerMapping.js";


export const handleDisconnect = (socket, uuid) => {
    removeUser(socket.id);
    console.log(`User disconnects: ${socket.id}`);
    console.log(`Current users : `, getUser());
}

export const handleConnection = (socket, uuid) => {
    console.log(`New user connected!: ${uuid} with socket ID ${socket.id}`);
    console.log(`Current users: `, getUser());

    createStage(uuid);

    socket.emit('connection', {uuid})
}

export const handlerEvent = (io, socket, data) => {
    if(!CLIENT_VERSION.includes(data.clientVersion)){
        socket.emit('response', {status: 'fail', message: 'Client version mismatch!'});
        return ;
    }

    const handler = handlerMappings[data.handlerId];
    if(!handler){
        socket.emit('response', {status: 'fail', message: "Handler not found"});
        return ;
    }

    const response = handler(data.userId, data.payload);

    // 모든 유저에게 보내는 정보
    if (response.broadcast) {
        io.emit('response', 'broadcast');
        return;
    }

    // 유저 한명에게만 보내는 정보
    socket.emit('response', response);
};