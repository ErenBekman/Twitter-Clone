import { io } from "socket.io-client";
import Vue from "vue";

const socket = io("http://localhost:8900");

export default ({ app }, inject) => {
  inject("socket", socket);
};
