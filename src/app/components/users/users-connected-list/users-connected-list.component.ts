import {Component, Input, OnInit} from '@angular/core';
import {animate, style, transition, trigger} from '@angular/animations';
import {Track} from '../../../../core/jitsi';

@Component({
  selector: 'app-users-connected-list',
  templateUrl: './users-connected-list.component.html',
  styleUrls: ['./users-connected-list.component.scss'],
  animations: [
    trigger('user', [
      transition(':enter', [
        style({ transform: 'scale(0)' }),
        animate(240, style({ transform: 'scale(1)' }))
      ]),
      transition(':leave', [
        style({ transform: 'scale(1)' }),
        animate(240, style({ transform: 'scale(0)' }))
      ]),
    ])
  ]
})
export class UsersConnectedListComponent implements OnInit {

  @Input() users: Track[];

  constructor() { }

  ngOnInit() {
  }

}
