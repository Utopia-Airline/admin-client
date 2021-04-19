import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ChatService} from '../../shared/services/chat.service';

@Component({
  selector: 'app-customer-service-message-box',
  templateUrl: './customer-service-message-box.component.html',
  styleUrls: ['./customer-service-message-box.component.scss']
})
export class CustomerServiceMessageBoxComponent implements OnInit {
  @Output() send = new EventEmitter(true);
  message = '';

  constructor(public chatService: ChatService) {
  }

  ngOnInit(): void {
  }

  handleSend(): void {
    if (this.chatService.customerId) {
      this.send.emit(this.message);
      this.message = '';
    }
  }

  handleEnter($event: KeyboardEvent): void {
    const trimmedText = this.message.trim();
    if ($event.key === 'Enter' && trimmedText.length > 0 && this.chatService.customerId) {
      console.log('this.message.length,', trimmedText.length);
      this.send.emit(this.message);
      this.message = '';
    }
  }
}
