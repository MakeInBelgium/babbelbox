import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersConnectedListComponent } from './users-connected-list.component';

describe('UsersConnectedListComponent', () => {
  let component: UsersConnectedListComponent;
  let fixture: ComponentFixture<UsersConnectedListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsersConnectedListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersConnectedListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
