import io, {Socket} from 'socket.io-client';
import { apiUrl } from '../config/apiUrl';

export const realtimeService = {
  connect(): Socket {
    const newSocket = io(apiUrl, {
      withCredentials: true,
    });

    return newSocket;
  },
}
// newSocket.on("connect", () => {
//   console.log('Connected to server')
//   if (newSocket.connected) {
//     newSocket.emit('enter-class', {
//       courseId,
//       device: 'web',
//     });
//   }

//   newSocket.on('class-end', (e) => {
//     if (e?.courseId === courseId) {
//       setClassOver(true);
//     }
//   });
// });