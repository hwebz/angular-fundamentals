import { HttpClient, HttpHeaders } from "@angular/common/http";
import { EventEmitter, Injectable } from "@angular/core";
import { catchError, Observable, of } from "rxjs";
import { IEvent, ISession } from "./event.model";

@Injectable()
export class EventService {
  constructor(private http: HttpClient) {}

  getEvents(): Observable<IEvent[]> {
    return this.http.get<IEvent[]>('/api/events')
      .pipe(catchError(this.handleError<IEvent[]>('getEvents', [])));
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    }
  }

  getEvent(id: number): Observable<IEvent> {
    return this.http.get<IEvent>(`/api/events/${id}`)
      .pipe(catchError(this.handleError<IEvent>('getEvent')));
  }

  saveEvent(event: IEvent): Observable<any> {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
    return this.http.post('/api/events', event, options)
      .pipe(catchError(this.handleError<IEvent>('saveEvent')));
  }

  updateEvent(event: IEvent): Observable<any> {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
    return this.http.put(`/api/events/${event.id}`, event, options)
      .pipe(catchError(this.handleError<IEvent>('updateEvent')));
  }

  searchSessions(searchTerm: string): Observable<ISession[]> {
    // return this.http.get<ISession[]>(`/api/events?q=${searchTerm}`)
    //   .pipe(catchError(this.handleError<ISession[]>('searchSessions', [])));

    const events = this.getEvents();

    const term = searchTerm.toLocaleLowerCase();
    let results: ISession[] = [];
    const emitter = new EventEmitter(true);

    events.subscribe((events: IEvent[]) => {
      
      events.forEach((event: IEvent) => {
        let matchingSessions = event.sessions.filter((session: ISession) => session.name.toLocaleLowerCase().indexOf(term) > -1);
        matchingSessions = matchingSessions.map((session: ISession) => {
          session.eventId = event.id;
          return session;
        })
        results = results.concat(matchingSessions);
      });

      emitter.emit(results)
    })

    return emitter;
  }
}