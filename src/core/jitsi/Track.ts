
export class Track {

  constructor(public track: any) {}

  getType(): string {
    return this.track.getType();
  }

  getId(): string {
    return this.track.getId();
  }

  getParticipantId(): string {
    return this.track.getParticipantId();
  }

  getDeviceId(): string {
    return this.track.getDeviceId();
  }

  isEnded(): string {
    return this.track.isEnded();
  }

  isMuted(): string {
    return this.track.isMuted();
  }

  mute(): Promise<any> {
    return this.track.mute();
  }

  unmute(): Promise<any> {
    return this.track.unmute();
  }

  setProperty(name: string, value: any) {
    return this.track.setProperty(name, value);
  }

  getProperty<T>(name: string): T | any {
    return this.track.getProperty(name);
  }

  getDisplayName(): string {
    return this.track.getDisplayName();
  }
}
