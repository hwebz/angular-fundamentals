import { Component, EventEmitter, Input, Output } from '@angular/core'
import { IEvent } from './shared';

@Component({
  selector: 'event-thumbnail',
  template: `
    <div class="well hoverwell thumbnail" [routerLink]="['/events', event?.id]">
      <h2>{{event?.name | uppercase}}</h2>
      <div>Date: {{event?.date | date:'MM/dd/YYYY'}}<div>
      <div
        [class.green]="event?.time === '8:00 am'"
        [ngClass]="{ green: event?.time === '8:00 am', bold: event?.time === '8:00 am'}"
        [ngSwitch]="event?.time">
        Time: {{event?.time}}
        <span *ngSwitchCase="'8:00 am'">(Early Start)</span>
        <span *ngSwitchCase="'10:00 am'">(Late Start)</span>
        <span *ngSwitchDefault>(Normal Start)</span>
      </div>
      <div
        [ngStyle]="{
          color: event?.time === '10:00 am' ? '#003300' : ''
        }"
      >Price: \${{event?.price}}<div>
      <div *ngIf="event?.location" [hidden]="!event?.location" [ngClass]="getStartTimeClass()">
        <span>Location: {{event?.location?.address}}</span>
        <span class="pad-left">{{event?.location?.city}}, {{event?.location?.country}}</span>
      <div>
      <div *ngIf="event?.onlineUrl">
        Online URL: {{event?.onlineUrl}}
      </div>
    </div>
  `,
  styles: [`
    .pad-left { margin-left: 10px; }
    .well div { color: #bbb; }
    .thumbnail { min-height: 210px; }
    .green { color: #003300 !important; }
    .bold { font-weight: bold; }
    .yellow { color: #ffff00 !important; }
    .italic { font-weight: italic; }
  `]
})
export class EventThumbnailComponent {
  @Input() event?: IEvent;

  getStartTimeClass() {
    const isLateStart = this.event && this.event.time === '10:00 am';
    // return {
    //   yellow: isLateStart,
    //   italic: isLateStart
    // }
    // return isLateStart ? 'yellow italic' : '';
    return isLateStart ? ['yellow', 'italic'] : [];
  }
}