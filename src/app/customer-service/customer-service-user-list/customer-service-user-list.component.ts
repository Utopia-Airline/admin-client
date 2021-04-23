import {Component, OnInit} from '@angular/core';
import {ChatService} from '../../shared/services/chat.service';

@Component({
  selector: 'app-customer-service-user-list',
  templateUrl: './customer-service-user-list.component.html',
  styleUrls: ['./customer-service-user-list.component.scss']
})
export class CustomerServiceUserListComponent implements OnInit {

  constructor(public chatService: ChatService) {
  }

  ngOnInit(): void {
  }

  setCustomerId(senderId: string): void {
    this.chatService.clearChat();
    this.chatService.customerId = senderId;
    this.chatService.handleLoadChats();
  }
}
