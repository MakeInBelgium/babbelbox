import {Component, HostListener, OnDestroy, OnInit} from '@angular/core';
import {Conference, ConferenceEvent, JitsiMeet, LogLevel, Track} from '../core/jitsi';
import {Message} from './Message';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy {
  public chat: Conference;
  public self: Track;
  public name: string;
  public messages: Message[] = [];

  async connect(name) {
    this.name = name;
    JitsiMeet.setLogLevel(LogLevel.INFO);

    JitsiMeet.init({
      disableAudioLevels: true,
      desktopSharingChromeExtId: 'mbocklcggfhnbahlnepmldehdhpjfcjp',
      desktopSharingChromeDisabled: false,
      desktopSharingChromeMinExtVersion: '0.1',
      desktopSharingFirefoxDisabled: true
    });

    const connection = JitsiMeet.connection(null, null, {
      hosts: {
        domain: 'meet.jit.si',
        muc: `conference.meet.jit.si`,
        focus: `focus.meet.jit.si`,
      },
      bosh: 'https://meet.jit.si/http-bind',
      clientNode: 'http://jitsi.org/jitsimeet'
    });

    await connection.connect();

    this.chat = connection.initConference('angular-jitsi-chat', {
      openBridgeChannel: 'websocket'
    });

    this.chat.setDisplayName(name);

    this.chat.addEventListener(ConferenceEvent.USER_JOINED, (id, participant) => {
      this.messages.push({
        type: 'user_join',
        userName: participant.getDisplayName(),
        time: new Date()
      });
    });

    this.chat.addEventListener(ConferenceEvent.USER_LEFT, (id, participant) => {
      this.messages.push({
        type: 'user_leave',
        userName: participant.getDisplayName(),
        time: new Date()
      });
    });

    this.self = await this.chat.join();

    this.chat.addEventListener(ConferenceEvent.MESSAGE_RECEIVED, (id, message) => {
      const msg = JSON.parse(message);
      this.messages.push({
        type: 'message',
        userName: msg.userName,
        time: new Date(),
        text: msg.text,
        fromMe: msg.userId === this.chat.myUserId()
      });
    });
  }

  ngOnDestroy(): void {
    this.chat.leave();
  }

  sendMessage(text: string) {

    const msg: Message = {
      text,
      type: 'message',
      userId: this.chat.myUserId(),
      userName: this.name,
      time: new Date(),
    };

    this.chat.sendTextMessage(JSON.stringify(msg));
  }

  @HostListener('window:beforeunload', ['$event'])
  canLeavePage($event: any) {
    this.chat.leave();
  }
}
