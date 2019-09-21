import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChatComponent } from './components/chat/chat.component';
import { UserListItemComponent } from './components/users/user-list-item/user-list-item.component';
import { UsersConnectedListComponent } from './components/users/users-connected-list/users-connected-list.component';

@NgModule({
  declarations: [
    AppComponent,
    ChatComponent,
    UserListItemComponent,
    UsersConnectedListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
