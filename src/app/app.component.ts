import {Component, HostListener, OnDestroy, OnInit} from '@angular/core';
import {Conference, ConferenceEvent, JitsiMeet, LogLevel, Track} from '../core/jitsi';
import {Message} from './Message';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  public chat: Conference;
  public self: Track;
  public messages: Message[] = [];

  async ngOnInit() {
    JitsiMeet.setLogLevel(LogLevel.ERROR);

    JitsiMeet.init({
      disableAudioLevels: true,
      desktopSharingChromeExtId: 'mbocklcggfhnbahlnepmldehdhpjfcjp',
      desktopSharingChromeDisabled: false,
      desktopSharingChromeMinExtVersion: '0.1',
      desktopSharingFirefoxDisabled: true
    });

    const connection = JitsiMeet.connection(null, null, {
      hosts: {
        domain: 'meet.jitsi',
        muc: `muc.meet.jitsi`,
      },
      bosh: '/jitsi/http-bind',
      clientNode: 'http://jitsi.org/jitsimeet'
    });

    await connection.connect();

    const chat = connection.initConference('chat-lob', {
      openBridgeChannel: 'websocket'
    });

    chat.setDisplayName(`Matheus ${Date.now()}`);

    chat.addEventListener(ConferenceEvent.USER_JOINED, (id, participant) => {
      this.messages.push({
        type: 'user_join',
        userName: participant.getDisplayName(),
        time: new Date()
      });
    });

    chat.addEventListener(ConferenceEvent.USER_LEFT, (id, participant) => {
      this.messages.push({
        type: 'user_leave',
        userName: participant.getDisplayName(),
        time: new Date()
      });
    });

    this.self = await chat.join();

    chat.addEventListener(ConferenceEvent.MESSAGE_RECEIVED, (id, message) => {
      const msg = JSON.parse(message);
      this.messages.push({
        type: 'message',
        userName: msg.userName,
        time: new Date(),
        text: msg.text,
        fromMe: msg.userId === this.self.getId()
      });
    });

    this.chat = chat;
  }

  ngOnDestroy(): void {
    this.chat.leave();
  }

  sendMessage(text: string) {

    const msg: Message = {
      text,
      type: 'message',
      userId: this.self.getId(),
      userName: this.self.getDisplayName(),
      time: new Date(),
    };

    this.chat.sendTextMessage(JSON.stringify(msg));

    // this.messages.push({
    //   ...msg,
    //   time: new Date(),
    //   fromMe: true,
    // });
  }

  @HostListener('window:beforeunload', ['$event'])
  canLeavePage($event: any) {
    this.chat.leave();
  }
}
