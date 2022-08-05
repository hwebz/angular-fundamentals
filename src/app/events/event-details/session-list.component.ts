import { Component, Input, OnChanges } from "@angular/core";
import { AuthService } from "src/app/user/auth.service";
import { IEvent, ISession } from "../shared";
import { VoterService } from "./voter.service";

@Component({
  selector: 'session-list',
  templateUrl: './session-list.component.html'
})

export class SessionListComponent implements OnChanges {
  @Input() sessions!: ISession[];
  @Input() filterBy!: string;
  @Input() sortBy!: string;
  @Input() event!: IEvent;
  @Input() eventId!: number;
  visibleSessions!: ISession[];

  constructor(public authService: AuthService, private voterService: VoterService) {}

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

  toggleVote(session: ISession) {
    if (this.userHasVoted(session)) {
      this.voterService.deleteVoter(this.eventId, session, this.authService.currentUser?.userName);
    } else {
      this.voterService.addVoter(this.event, session, this.authService.currentUser?.userName);
    }

    if (this.sortBy === 'votes') {
      this.visibleSessions.sort();
    }
  }

  userHasVoted(session: ISession): boolean {
    return this.voterService.userHasVoted(session, this.authService.currentUser?.userName);
  }
}