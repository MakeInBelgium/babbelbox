import * as JitsiLib from './lib-jitsi-meet.min';
import {LogLevel} from './LogLevel';
import {Connection} from './Connection';

export interface JitsiOptions {
  desktopSharingChromeExtId: string;
  desktopSharingChromeSources?: keyof ['screen', 'window'];
  useIPv6?: boolean;
  desktopSharingChromeDisabled?: boolean;
  desktopSharingChromeMinExtVersion?: string;
  desktopSharingFirefoxDisabled?: boolean;
  disableAudioLevels?: boolean;
  disableSimulcast?: boolean;
  enableWindowOnErrorHandler?: boolean;
  disableThirdPartyRequests?: boolean;
  enableAnalyticsLogging?: boolean;
  callStatsCustomScriptUrl?: string;
  callStatsConfIDNamespace?: string;
  disableRtx?: boolean;
  disableH264?: boolean;
  preferH264?: boolean;
}

export interface ConnectionOptions {
  bosh?: string;
  hosts: {
    domain: string,
    muc?: string,
    anonymousdomain?: string,
  };
  useStunTurn?: boolean;
  enableLipSync?: boolean;
  clientNode?: string;

}

export class JitsiMeet {

  public static init(options: JitsiOptions) {
    JitsiLib.init(options);
  }

  public static setLogLevel(level: LogLevel) {
    JitsiLib.setLogLevel(level);
  }

  public static connection(appID, token, options: ConnectionOptions): Connection {
    return new Connection(new JitsiLib.JitsiConnection(appID, token, options));
  }
}
