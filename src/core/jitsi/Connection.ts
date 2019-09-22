import * as JitsiLib from './lib-jitsi-meet.min';
import {ConferenceEvent, ConnectionEvent, ConnectionQuality} from './Events';
import {Conference} from './Conference';

export interface ConferenceOptions {
  openBridgeChannel: 'datachannel' | 'websocket' | boolean;
  recordingType?: any;
  jirecon?: any;
  callStatsID?: string;
  callStatsSecret?: string;
  enableTalkWhileMuted?: boolean;
  ignoreStartMuted?: boolean;
  enableStatsID?: boolean;
  enableDisplayNameInStats?: boolean;
  startSilent?: boolean;
  confID?: string;
}

export class Connection {

  constructor(private connection: any) { }

  addEventListener(event: ConnectionEvent | ConnectionQuality, fn: () => void): () => {} {
    this.connection.addEventListener(event, fn);
    return () => this.connection.removeEventListener(event, fn);
  }

  removeEventListener(event: ConnectionEvent, fn: () => {}) {
    return this.connection.removeEventListener(event, fn);
  }

  connect(): Promise<any> {
    return new Promise((resolve, reject) => {

      const joinListener = this.addEventListener(ConnectionEvent.CONNECTION_ESTABLISHED, () => {
        joinListener();
        joinErrorListener();
        resolve();
      });

      const joinErrorListener = this.addEventListener(ConnectionEvent.CONNECTION_FAILED, (...args) => {
        joinListener();
        joinErrorListener();
        reject(new Error('can\'t connect'));
      });

      this.connection.connect();
    });
  }

  disconnect() {
    this.connection.disconnect();
  }

  initConference(name: string, options?: ConferenceOptions) {
    return new Conference(this.connection.initJitsiConference(name, options));
  }

  addFeature(name: string) {
    this.connection.addFeature(name);
  }

  removeFeature(name: string) {
    this.connection.removeFeature(name);
  }
}
