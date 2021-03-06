import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-error-popover',
  templateUrl: './error-popover.component.html',
  styleUrls: ['./error-popover.component.scss']
})
export class ErrorPopoverComponent implements OnInit {

  @Input() show = false;
  @Input() message: string;
  @Output() showChange = new EventEmitter<boolean>(true);

  constructor() {
  }


  ngOnInit(): void {
  }

  closeView(): void {
    this.showChange.emit(false);
  }
}
