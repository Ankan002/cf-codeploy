import {io} from 'socket.io-client';
import { Socket } from 'socket.io-client';
let socket: Socket;

const getSocket = () => {
    console.log(socket)
    if(socket)
        return socket;
    const sockett = io(process.env.NEXT_PUBLIC_SOCKET_URL ?? "http://localhost:5001",{transports: ['websocket']});
    return sockett;
}

export default getSocket;
