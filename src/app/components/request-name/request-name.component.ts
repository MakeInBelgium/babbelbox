import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-request-name',
  templateUrl: './request-name.component.html',
  styleUrls: ['./request-name.component.scss']
})
export class RequestNameComponent implements OnInit {

  @Output() setName = new EventEmitter<string>();
  public fieldControl = new FormControl(['']);

  constructor() { }

  ngOnInit() {
  }

}
