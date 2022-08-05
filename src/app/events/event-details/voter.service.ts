import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Observable, of } from "rxjs";
import { IEvent, ISession } from "../shared";

@Injectable()
export class VoterService {
  constructor(private http: HttpClient) {}
  
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    }
  }

  deleteVoter(eventId: number, session: ISession, voterName?: string): void {
    session.voters = session.voters.filter((voter: string) => voter !== voterName);

    const url = `/api/events/${eventId}/sessions/${session.id}/voters/${voterName}`;
    this.http.delete(url)
      .pipe(catchError(this.handleError('deleteVoter')))
      .subscribe();
  }

  addVoter2(eventId: number, session: ISession, voterName: string) {
    session.voters.push(voterName);

    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    const url = `/api/events/${eventId}/sessions/${session.id}/voters/${voterName}`;
    this.http.post(url, {}, options)
      .pipe(catchError(this.handleError('addVoter')))
      .subscribe();
  }
  
  addVoter(event: IEvent, session: ISession, userName?: string) {
    if (userName && !session.voters.includes(userName)) {
      session.voters.push(userName);
      const newSessions = event.sessions.map((s: ISession) => {
        if (s.id === session.id) {
          return {
            ...s,
            voters: [
              ...s.voters,
              userName
            ]
          }
        }
        return s;
      })
      const options = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      };
      this.http.put(`/api/events/${event.id}`, {
        ...event,
        sessions: newSessions
      }, options)
        .pipe(catchError(this.handleError<IEvent>('addVoter')))
        .subscribe();
    }
  }

  userHasVoted(session: ISession, userName?: string) {
    return session.voters.some((voter: string) => voter === userName);
  }
}