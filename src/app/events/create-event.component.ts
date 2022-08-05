import { Component, OnInit } from "@angular/core";
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
export class CreateEventComponent implements OnInit {
  isDirty = true;
  newEvent!: IEvent;
  
  constructor(private route: Router, private eventService: EventService) {}

  ngOnInit(): void {
    this.newEvent = {
      name: 'Ng Spectacular',
      date: new Date('8/8/2028'),
      time: '10:00 am',
      price: 799.99,
      location: {
        address: '456 Happy St',
        city: 'Felicity',
        country: 'Angularistan'
      },
      onlineUrl: 'http://ngSpectacular.com',
      imageUrl: 'http://ngSpectacular.com/logo.png',
    } as IEvent;
  }

  saveEvent(formValues: any) {
    this.eventService.saveEvent(formValues).subscribe(() => {
      this.isDirty = false;
      this.route.navigate(['/events']);
    });
  }

  cancel() {
    this.route.navigate(['/events']);
  }
}