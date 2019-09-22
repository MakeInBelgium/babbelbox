import {ConferenceEvent, ConnectionEvent} from './Events';
import {Track} from './Track';

export interface UserCommand {
  value: any;
  attributes?: object;
  children?: Array<UserCommand>;
}

export function encodeCommand(command: UserCommand) {
  command.value = JSON.stringify(command.value);

  if (command.children && command.children.length > 0) {
    command.children = command.children.map(encodeCommand);
  }
  return command;
}

export function decodeCommand(command: UserCommand) {
  command.value = JSON.parse(command.value);

  if (command.children && command.children.length > 0) {
    command.children = command.children.map(encodeCommand);
  }
  return command;
}

export class Conference {
  constructor(private conference: any) {}

  get participants() {
    return this.conference.getParticipants();
  }

  addEventListener(event: ConferenceEvent, fn: (...args) => void): () => {} {
    this.conference.addEventListener(event, fn);
    return () => this.conference.removeEventListener(event, fn);
  }

  removeEventListener(event: ConnectionEvent, fn: () => {}) {
    return this.conference.removeEventListener(event, fn);
  }

  join(psw?: string): Promise<Track> {
    return new Promise((resolve, reject) => {

      const joinListener = this.addEventListener(ConferenceEvent.USER_JOINED, (selfId, selfTrack) => {
        joinListener();
        joinErrorListener();
        resolve(new Track(selfTrack));
      });

      const joinErrorListener = this.addEventListener(ConferenceEvent.CONFERENCE_FAILED, () => {
        joinListener();
        joinErrorListener();
        reject(new Error('can\'t join'));
      });

      this.conference.join(psw);
    });
  }

  leave() {
    this.conference.leave();
  }

  sendTextMessage(text: string) {
    this.conference.sendTextMessage(text);
  }

  setDisplayName(name: string) {
    this.conference.setDisplayName(name);
  }

  sendCommand(name: string, values: UserCommand) {
    this.conference.sendCommand(name, encodeCommand(values));
  }

  sendCommandOnce(name: string, values: UserCommand) {
    this.conference.sendCommandOnce(name, encodeCommand(values));
  }

  addCommandListener(event: string, fn: (...args) => void): () => {} {
    const cb = (values) => fn(decodeCommand(values));
    this.conference.addCommandListener(event, cb);
    return () => this.conference.removeCommandListener(event, cb);
  }

  removeCommandListener(event: string, fn: () => {}) {
    return this.conference.removeCommandListener(event, fn);
  }

  addTrack(track: Track): Promise<any> {
    return this.conference.addTrack(track);
  }

  removeTrack(track: Track): Promise<any> {
    return this.conference.removeTrack(track);
  }

  getLocalTracks() {
    return this.conference.getLocalTracks();
  }

  myUserId() {
    return this.conference.myUserId();
  }
}
