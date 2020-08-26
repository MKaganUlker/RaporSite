import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable, Subscriber } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class WebSocketService {
  public socket: WebSocket;
  readonly ws: string = 'ws://';
  /*   readonly port: string = ':9090'; */
  readonly port: string = ':3599';


  constructor() {
    /* this.socket = new WebSocket(this.ws + 'IP' + this.port); */
    this.socket = new WebSocket(this.ws + '85.99.234.110' + this.port);
  }

  public SendData(str) {
    // tslint:disable-next-line: triple-equals
    if (this.socket.readyState == WebSocket.OPEN) {
      console.log('servise start');
      this.socket.send(String.fromCharCode(2) + str + String.fromCharCode(20));
      console.log("senddata",str);
    }
  }

  setupSocketConnection() {
    this.socket.onopen = function (event) {
      console.log('deneme');
    };
    this.socket.addEventListener('message', function(event) {
      const msg = JSON.parse(event.data);
      console.log(msg);
    });

  }

}
