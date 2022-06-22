import { Component } from '@angular/core';

@Component({
  selector: 'events-list',
  template: `
  <div>
      <h1>Upcoming Angular Events</h1>
      <hr />
      <div class="well">
        <div>Hello world</div>
      </div>
      <event-thumbnail [event]="event"></event-thumbnail>
  </div>
  `,
  styles: [`
    .well div { color: red; font-size: 20px; }
  `]
})
export class EventsListComponent {
  event = {
    id: 1,
    name: 'Angular Connect',
    date: '9/26/2036',
    time: '10:00 am',
    price: 599.99,
    imageUrl: '/assets/images/angularconnect-shield.png',
    location: {
      address: '1057 DT',
      city: 'London',
      country: 'England',
    }
  };
}