import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http'
import { Error404Component } from './errors/404.component';
import { EventsAppComponent } from './events-app.component';
import {
  CreateEventComponent,
  EventDetailsComponent,
  EventListResolver,
  EventsListComponent,
  EventThumbnailComponent,
  CreateSessionComponent,
  DurationPipe,
  UpVoteComponent,
  VoterService,
  LocationValidator,
  EventResolver
} from './events'
import { EventService } from './events/shared/event.service';
import { NavBarComponent } from './nav/navbar.component';
import { appRoutes } from './router';
import { AuthService } from './user/auth.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SessionListComponent } from './events/event-details/session-list.component';
import {
  CollapsibleWellComponent,
  TOASTR_TOKEN,
  Toastr,
  JQ_TOKEN,
  SimpleModalComponent,
  ModalTriggerDirective,
} from './common';

const toastr: Toastr = (window as any)['toastr'];
const jQuery: any = (window as any)['$'];
@NgModule({
  declarations: [
    EventsAppComponent,
    EventsListComponent,
    EventThumbnailComponent,
    EventDetailsComponent,
    NavBarComponent,
    CreateEventComponent,
    Error404Component,
    CreateSessionComponent,
    SessionListComponent,
    CollapsibleWellComponent,
    DurationPipe,
    SimpleModalComponent,
    ModalTriggerDirective,
    UpVoteComponent,
    LocationValidator
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule
  ],
  providers: [
    EventService,
    {
      provide: TOASTR_TOKEN,
      useValue: toastr
    },
    {
      provide: JQ_TOKEN,
      useValue: jQuery,
    },
    // {
    //   provide: MinimalLogger,
    //   useExisting: Logger
    // },
    // {
    //   provide: Logger,
    //   useFactory: factory()
    // },
    EventResolver,
    EventListResolver,
    {
      provide: 'canDeactivateCreateEvent',
      useValue: checkDirtyValue
    },
    AuthService,
    VoterService,
  ],
  bootstrap: [EventsAppComponent]
})
export class AppModule { }

export function checkDirtyValue(component: CreateEventComponent) {
  if (component.isDirty) {
    return window.confirm('You have not saved this event, do you really want to cancel?');
  }

  return true;
}
