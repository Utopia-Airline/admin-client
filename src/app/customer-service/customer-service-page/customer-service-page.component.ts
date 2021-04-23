import {Component, OnInit} from '@angular/core';
import {ChatService} from '../../shared/services/chat.service';

@Component({
  selector: 'app-customer-service-page',
  templateUrl: './customer-service-page.component.html',
  styleUrls: ['./customer-service-page.component.scss']
})
export class CustomerServicePageComponent implements OnInit {

  constructor(private chatService: ChatService) {
  }

  ngOnInit(): void {
    this.chatService.handleConnect();
  }

  handleSend(message: string): void {
    console.log('handle send', message);
    this.chatService.message = message;
    this.chatService.handleSend();
  }

}
