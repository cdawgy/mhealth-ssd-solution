import SockJS from "sockjs-client";
import { getBaseUrl } from "./BaseUrlUtils";
import * as Stomp from "stompjs";
import { GameState } from "../types/GameState";

export let stompClient: Stomp.Client | undefined = undefined;

export const connectToRoom = (
  reactStateCallback: (gameState: GameState) => void,
  roomCode?: number
): string => {
  const room: number = roomCode
    ? roomCode
    : Math.floor(Math.random() * 90000) + 10000;
  //   let socket = new SockJS(`${getBaseUrl()}/gs-guide-websocket`);
  // Below url uses mac IP address, this is to allow connections to be established on other devices
  let socket = new SockJS(`http://192.168.0.19:8081/game-session`);
  stompClient = Stomp.over(socket);
  stompClient.connect(
    {
      "Access-Control-Allow-Origin": "*",
    },
    (frame) => {
      stompClient?.subscribe("/topic/room/" + room, (message) => {
        const gameState: GameState = JSON.parse(message.body);
        reactStateCallback(gameState);
      });
    }
  );
  return room.toString();
};

export const disconnectFromRoom = () => {
  if (stompClient) {
    stompClient.disconnect(() => {
      console.log(`Disconnect callback: `);
    });
  }
  console.log("Disconnected");
};

export const updateState = (roomCode: string, gameState: GameState) => {
  stompClient?.send(
    "/app/state/" + roomCode,
    {},
    JSON.stringify(gameState)
  );
};
