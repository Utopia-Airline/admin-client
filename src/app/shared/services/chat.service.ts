import {Injectable} from '@angular/core';

declare var SockJS;
declare var Stomp;

class Message {
  content?: string;
  senderId?: string;
  incoming?: boolean;
  senderUsername?: string;
  receiverUsername?: string;
}

class Customer {
  username?: string;
  sessionId?: string;
  senderId?: string;
  senderShortName?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private readonly socket = null;
  private readonly stompClient = null;
  chatHistory: Message[] = [];
  activeCustomers: Map<string, Customer> = new Map<string, Customer>();
  isTyping = false;
  sessionId: string;
  message: string;
  customerId: string;

  constructor() {
    try {
      this.socket = new SockJS('/secured/room');
      this.stompClient = Stomp.over(this.socket);
    } catch (err) {
      console.log('socket error', err);
    }
  }

  handleConnect(): void {
    this.stompClient.connect({}, (frame) => {
      try {
        console.log('this.stompClient:::', this.stompClient);
        console.log('secure connected:', frame);
        this.sessionId = this.getSessionId(this.stompClient.ws._transport.url);
        this.stompClient.subscribe(`/secured/user/admin/queue/private/chat`, (msgOut) => {
          console.log('subscribe to chat', msgOut);
          // setMessages(prevState => [...prevState, JSON.parse(msgOut.body).content]);
          const message: Message = JSON.parse(msgOut.body);
          if (message && message.senderId === this.customerId) {
            this.chatHistory.push({incoming: true, content: message.content});
          }
        });
        this.stompClient.subscribe(`/secured/user/admin/queue/private/join`, (msgOut) => {
          console.log('subscribe to join');
          const customer: Customer = JSON.parse(msgOut.body);
          if (customer) {
            console.log('not null customer', customer);
            // this.activeCustomers.push(customer);
            this.activeCustomers.set(customer.senderId, customer);
          }
        });
        this.stompClient.subscribe(`/secured/user/admin/queue/private/update`, (msgOut) => {
          console.log('subscribe to update');
          this.isTyping = true;
        });
        this.stompClient.subscribe(`/secured/user/admin/queue/private/load`, (msgOut) => {
          console.log('subscribe to load');
          const message: Message = JSON.parse(msgOut.body);
          if (message) {
            message.incoming = (message.senderId !== 'admin');
            this.chatHistory.push(message);
          }
        });
        this.handleLoadJoins();
      } catch (err) {
        console.log('socket error:', err);
      }
    });
  }

  handleSend(): void {
    const message: Message = {
      content: this.message, incoming: false, senderUsername: 'admin', receiverUsername: this.customerId
    };
    this.chatHistory.push(message);
    console.log('chatHistory', this.chatHistory);
    this.stompClient.send(`/app/secured/room/chat`, {}, JSON.stringify({
      message: this.message, senderId: 'admin', receiverUsername: this.customerId
    }));
  }

  handleJoin(): void {

  }

  handleLoadChats(): void {
    this.stompClient.send(`/app/secured/room/chat/history`, {}, JSON.stringify({
      senderId: 'admin', receiverUsername: this.customerId
    }));
  }

  handleLoadJoins(): void {
    this.stompClient.send(`/app/secured/room/join/history`, {}, JSON.stringify({senderId: 'admin'}));
  }

  handleTyping(): void {
  }

  clearChat(): void {
    this.chatHistory = [];
  }

  getSessionId(url: string): string {
    try {
      // ws://localhost:4200/secured/room/775/oqxpdnyp/websocket
      console.log('url', url);
      const session = url.match(/ws:\/\/.*\/secured\/room\/.*\/(.*)\/websocket/);
      const sessionId = session[1];
      console.log('sessionId', sessionId);
      return sessionId;
    } catch (err) {
      console.log(err);
      return '';
    }
  }
}
