import * as JitsiLib from './lib-jitsi-meet.min';

export enum LogLevel {
  TRACE= JitsiLib.logLevels.TRACE,
  DEBUG = JitsiLib.logLevels.DEBUG,
  INFO = JitsiLib.logLevels.INFO,
  LOG = JitsiLib.logLevels.LOG,
  WARN = JitsiLib.logLevels.WARN,
  ERROR = JitsiLib.logLevels.ERROR,
}
