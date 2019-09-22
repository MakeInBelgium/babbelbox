import * as JitsiLib from './lib-jitsi-meet.min';

export enum ConnectionEvent {
  CONNECTION_FAILED = JitsiLib.events.connection.CONNECTION_FAILED,
  CONNECTION_ESTABLISHED = JitsiLib.events.connection.CONNECTION_ESTABLISHED,
  CONNECTION_DISCONNECTED = JitsiLib.events.connection.CONNECTION_DISCONNECTED,
  WRONG_STATE = JitsiLib.events.connection.WRONG_STATE,
}

export enum MediaDevicesEvent {
  DEVICE_LIST_CHANGED = JitsiLib.events.mediaDevices.DEVICE_LIST_CHANGED,
  PERMISSION_PROMPT_IS_SHOWN = JitsiLib.events.mediaDevices.PERMISSION_PROMPT_IS_SHOWN,
}

export enum ConferenceEvent {
  TRACK_ADDED = JitsiLib.events.conference.TRACK_ADDED,
  TRACK_REMOVED = JitsiLib.events.conference.TRACK_REMOVED,
  TRACK_MUTE_CHANGED = JitsiLib.events.conference.TRACK_MUTE_CHANGED,
  TRACK_AUDIO_LEVEL_CHANGED = JitsiLib.events.conference.TRACK_AUDIO_LEVEL_CHANGED,
  DOMINANT_SPEAKER_CHANGED = JitsiLib.events.conference.DOMINANT_SPEAKER_CHANGED,
  USER_JOINED = JitsiLib.events.conference.USER_JOINED,
  USER_LEFT = JitsiLib.events.conference.USER_LEFT,
  MESSAGE_RECEIVED = JitsiLib.events.conference.MESSAGE_RECEIVED,
  DISPLAY_NAME_CHANGED = JitsiLib.events.conference.DISPLAY_NAME_CHANGED,
  SUBJECT_CHANGED = JitsiLib.events.conference.SUBJECT_CHANGED,
  LAST_N_ENDPOINTS_CHANGED = JitsiLib.events.conference.LAST_N_ENDPOINTS_CHANGED,
  CONFERENCE_JOINED = JitsiLib.events.conference.CONFERENCE_JOINED,
  CONFERENCE_LEFT = JitsiLib.events.conference.CONFERENCE_LEFT,
  DTMF_SUPPORT_CHANGED = JitsiLib.events.conference.DTMF_SUPPORT_CHANGED,
  USER_ROLE_CHANGED = JitsiLib.events.conference.USER_ROLE_CHANGED,
  USER_STATUS_CHANGED = JitsiLib.events.conference.USER_STATUS_CHANGED,
  CONFERENCE_FAILED = JitsiLib.events.conference.CONFERENCE_FAILED,
  CONFERENCE_ERROR = JitsiLib.events.conference.CONFERENCE_ERROR,
  KICKED = JitsiLib.events.conference.KICKED,
  START_MUTED_POLICY_CHANGED = JitsiLib.events.conference.START_MUTED_POLICY_CHANGED,
  STARTED_MUTED = JitsiLib.events.conference.STARTED_MUTED,
  BEFORE_STATISTICS_DISPOSED = JitsiLib.events.conference.BEFORE_STATISTICS_DISPOSED,
  CONNECTION_STATS = JitsiLib.events.conference.CONNECTION_STATS,
  AUTH_STATUS_CHANGED = JitsiLib.events.conference.AUTH_STATUS_CHANGED,
  ENDPOINT_MESSAGE_RECEIVED = JitsiLib.events.conference.ENDPOINT_MESSAGE_RECEIVED,
  PARTICIPANT_PROPERTY_CHANGED = JitsiLib.events.conference.PARTICIPANT_PROPERTY_CHANGED,
}

export enum ConnectionQuality {
  LOCAL_STATS_UPDATED = JitsiLib.events.connectionQuality.ENDPOINT_MESSAGE_RECEIVED,
  REMOTE_STATS_UPDATED = JitsiLib.events.connectionQuality.ENDPOINT_MESSAGE_RECEIVED,
}

