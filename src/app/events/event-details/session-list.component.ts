import { Component, Input, OnChanges } from "@angular/core";
import { ISession } from "../shared";

@Component({
  selector: 'session-list',
  templateUrl: './session-list.component.html'
})

export class SessionListComponent implements OnChanges {
  @Input() sessions!: ISession[];
  @Input() filterBy!: string;
  @Input() sortBy!: string;
  visibleSessions!: ISession[];

  ngOnChanges() {
    if (this.sessions) {
      this.filterSessions(this.filterBy);
      if (this.sortBy === 'name') {
        this.visibleSessions = this.visibleSessions.sort((s1: ISession, s2: ISession) => {
          return s1.name > s2.name ? 1 : (s1.name === s2.name ? 0 : -1);
        });
      } else {
        this.visibleSessions = this.visibleSessions.sort((s1: ISession, s2: ISession) => s1.voters.length - s2.voters.length);
      }
    }
  }

  filterSessions(filterBy: string) {
    if (filterBy === 'all') {
      this.visibleSessions = this.sessions.slice(0);
    } else {
      this.visibleSessions = this.sessions.filter((session: ISession) => {
        return session.level.toLowerCase() === filterBy
      });
    }
  }
}