export interface TrackIlo {
    trackIloId:number,
    trackOutcome: string;
    trackType: string;
    trackId: number;
    trackDescription:string

}

export interface TrackIloWithWeight extends TrackIlo {
    weight: number;
  }
