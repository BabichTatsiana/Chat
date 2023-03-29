export const API_ENDPOINT = process.env.SOCKET_URL || "http://localhost:5000/";

export const EVENTS = {
  connection: "connection",
  CLIENT: {
    CREATE_ROOM: "CREATE_ROOM",
    SEND_ROOM_MESSAGE: "SEND_ROOM_MESSAGE",
    JOIN_ROOM: "JOIN_ROOM",
  },
  SERVER: {
    ROOMS: "ROOMS",
    JOINED_ROOM: "JOINED_ROOM",
    ROOM_MESSAGE: "ROOM_MESSAGE",
  },
};

export const MESSAGES = [
  {
    userName: "Nigativ",
    icon: "m",
    message: "теперь игра закончена)))",
    time: "14:27",
  },
  {
    userName: "BivOld",
    icon: "k",
    message:
      "Я думал, что они будут пополнятся разв н-ное время. А тут реально игра закончена",
    time: "14:28",
  },
  {
    userName: "Nigativ",
    icon: "m",
    status: "moderator",
    message: "wac можно только купить",
    time: "14:31",
  },
  {
    userName: "Skylifesky",
    status: "admin",
    icon: "m",
    message: "Цена 1 wac=0,1$ и цена не изменится",
    time: "14:31",
  },
  {
    userName: "tata",
    message: "Сегодня идём на Германию",
    time: "10:21",
  },
];

export const TABS = [
  {
    key: 0,
    name: "ОБЩИЙ",
  },
  {
    key: 1,
    name: "КЛАН",
  },
  {
    key: 2,
    name: "ДРУЗЬЯ",
  },
  {
    key: 3,
    name: "НОВОСТИ",
  },
];

export const USERNAME = "tata";

export const GENERAL = "general";

export const LANGS = [
  { key: 0, title: "RU" },
  { key: 1, title: "EN" },
  { key: 2, title: "ZHO" },
];
