import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Message} from '../../Message';
import {animate, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
  animations: [
    trigger('message', [
      transition(':enter', [
        style({ transform: 'translateY(50%)', opacity: 0 }),
        animate(240, style({ transform: 'translateY(0%)', opacity: 1 }))
      ]),
    ])
  ]
})
export class ChatComponent implements OnInit, OnChanges {

  @Input() messages: Message[];
  @Input() disabled: boolean;
  @Output() public sendMessage = new EventEmitter<string>();

  public fieldControl = new FormControl(['']);

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.disabled) {
      this.fieldControl[changes.disabled.currentValue ? 'disable' : 'enable']();
    }
  }

}
