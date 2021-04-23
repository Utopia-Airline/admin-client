import {Component, OnInit} from '@angular/core';
import {ChatService} from '../../shared/services/chat.service';

@Component({
  selector: 'app-customer-service-main',
  templateUrl: './customer-service-main.component.html',
  styleUrls: ['./customer-service-main.component.scss']
})
export class CustomerServiceMainComponent implements OnInit {

  constructor(public chatService: ChatService) {
  }

  ngOnInit(): void {
  }

}
