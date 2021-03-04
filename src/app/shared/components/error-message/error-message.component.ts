import {Component, Input, OnInit} from '@angular/core';

type Error = {
  isError: boolean;
  message: string;
  status: number;
};

@Component({
  selector: 'app-error-message',
  templateUrl: './error-message.component.html',
  styleUrls: ['./error-message.component.scss']
})
export class ErrorMessageComponent implements OnInit {

  @Input()
  error: Error;

  constructor() {
  }

  ngOnInit(): void {
  }

}
