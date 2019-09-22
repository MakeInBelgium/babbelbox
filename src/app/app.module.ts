import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChatComponent } from './components/chat/chat.component';
import { UserListItemComponent } from './components/users/user-list-item/user-list-item.component';
import { UsersConnectedListComponent } from './components/users/users-connected-list/users-connected-list.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ReactiveFormsModule} from '@angular/forms';
import { RequestNameComponent } from './components/request-name/request-name.component';

@NgModule({
  declarations: [
    AppComponent,
    ChatComponent,
    UserListItemComponent,
    UsersConnectedListComponent,
    RequestNameComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
