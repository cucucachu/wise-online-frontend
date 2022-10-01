import io, { Socket } from "socket.io-client";
import { AppConfig } from "../services/appConfig";

export const realtimeService = {
  connect(): Socket {
    const newSocket = io(AppConfig.apiUrl, {
      withCredentials: true,
    });

    return newSocket;
  },
};
