import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { EventService, IEvent } from "./shared";

@Component({
  templateUrl: './create-event.component.html',
  styles: [`
    em { float: right; color: #e05c65; padding-left: 10px; }
    .error input { background-color: #e3c3c5; }
    .error ::-webkit-input-placeholder { color: #999; }
    .error ::-moz-placeholder { color: #999; }
    .error :-moz-placeholder { color: #999; }
    .error :ms-input-placeholder { color: #999; }
  `]
})
export class CreateEventComponent {
  isDirty: boolean = true;
  newEvent!: IEvent;
  
  constructor(private route: Router, private eventService: EventService) {}

  saveEvent(formValues: any) {
    this.eventService.saveEvent(formValues);
    this.route.navigate(['/events']);
  }

  cancel() {
    this.route.navigate(['/events']);
  }
}