import { Component } from "@angular/core";
import { ActivatedRoute, Data, Params } from "@angular/router";
import { IEvent, ISession } from "../shared";
import { EventService } from "../shared/event.service";

@Component({
  templateUrl: './event-details.component.html',
  styles: [`
    .container { padding-left: 20px; padding-right: 20px; }
    .event-image { height: 100px; }
    a { cursor: pointer; }
  `]
})
export class EventDetailsComponent {
  event: any;
  addMode!: boolean;
  filterBy = 'all';
  sortBy = 'name';

  constructor(private eventService: EventService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.data.forEach((data: Data) => {
      this.event = data['event'];
      this.addMode = false;
    })
  }

  addSession() {
    this.addMode = true;
  }

  saveNewSession(session: ISession) {
    if (!this.event.sessions) {
      this.event.sessions = [];
    }
    const nextId = Math.max.apply(null, this.event.sessions.map((s: ISession) => s.id));
    session.id = nextId + 1;
    this.event.sessions.push(session);
    this.eventService.updateEvent(this.event).subscribe();
    this.addMode = false;
  }

  cancelAddSession() {
    this.addMode = false;
  }

  handleFilter(selectedFilter: string) {
    this.filterBy = selectedFilter;
  }

  handleSort(selectedSort: string) {
    this.sortBy = selectedSort;
  }
}