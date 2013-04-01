/// <reference path="../../_references.ts" />

var o: PlaySustains;

export class PlaySustains {

  private id = 0;

  constructor(private device: IDevice,
              private params: IGame.IParams,
              private sustainNotes: IGame.ISustainNote[]) {
    o = this;
  }

  play() {
    while (o.isIdBelowCurrentTime()) {
      o.playSustainNote(o.sustainNotes[o.id]);
      o.id++;
    }
  }

  private isIdBelowCurrentTime() {
    return o.sustainNotes[o.id] &&
           o.sustainNotes[o.id].time < o.params.readOnly.p_elapsedTime;
  }

  private playSustainNote(note: IGame.ISustainNote) {
    if (o.params.readOnly.p_sustain) {
      if (note.on) {
        o.device.out(176, 64, 127);
      } else {
        o.device.out(176, 64, 0);
      }
    }
  }
}