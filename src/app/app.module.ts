import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { Error404Component } from './errors/404.component';
import { EventsAppComponent } from './events-app.component';
import {
  CreateEventComponent,
  EventDetailsComponent,
  EventRouteActivator,
  EventListResolver,
  EventsListComponent,
  EventThumbnailComponent,
  CreateSessionComponent,
  DurationPipe
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

let toastr: Toastr = (window as any)['toastr'];
let jQuery: any = (window as any)['$'];
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
    ModalTriggerDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes)
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
    {
      provide: EventRouteActivator,
      useClass: EventRouteActivator
    },
    EventListResolver,
    {
      provide: 'canDeactivateCreateEvent',
      useValue: checkDirtyValue
    },
    AuthService,
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
