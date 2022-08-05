import { Component, DebugElement, Input, NO_ERRORS_SCHEMA } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { CollapsibleWellComponent } from "src/app/common";
import { AuthService } from "src/app/user/auth.service"
import { IUser } from "src/app/user/user.model";
import { DurationPipe, IEvent, ISession } from "../shared";
import { SessionListComponent } from "./session-list.component";
import { UpVoteComponent } from "./upvote.component";
import { VoterService } from "./voter.service";

describe('SessionListComponent', () => {
  
  let mockAuthService: AuthService;
  let mockVoterService: VoterService;
  let fixture: ComponentFixture<SessionListComponent>;
  let component: SessionListComponent;
  let element: HTMLElement;
  let debugEl: DebugElement;

  beforeEach(() => {
    mockAuthService = <AuthService> {
      isAuthenticated: () => true,
      currentUser: <IUser>{
        userName: 'Joe'
      }
    };
    mockVoterService = <VoterService> <unknown>{
      userHasVoted: () => true,
    };
    TestBed.configureTestingModule({
      declarations: [
        SessionListComponent,
        DurationPipe,
        CollapsibleWellComponent,
        UpVoteComponent
      ],
      providers: [
        {
          provide: AuthService,
          useValue: mockAuthService
        },
        {
          provide: VoterService,
          useValue: mockVoterService
        }
      ],
      schemas: [
        NO_ERRORS_SCHEMA
      ]
    });
    fixture = TestBed.createComponent(SessionListComponent);
    component = fixture.componentInstance;
    debugEl = fixture.debugElement;
    element = fixture.nativeElement;
  })
  
  describe('initial display', () => {
    it('should have the correct name', () => {
      component.sessions = <ISession[]> [
        {
          name: 'Session 1',
          id: 3,
          presenter: 'Joe',
          duration: 1,
          level: 'beginner',
          abstract: 'abstract',
          voters: ['john', 'bob']
        }
      ];
      component.filterBy = 'all';
      component.sortBy = 'name';
      component.eventId = 4;
      component.event = <IEvent> {
        id: 4
      };

      component.ngOnChanges();

      fixture.detectChanges();

      // expect(element.querySelector('[well-title]')?.textContent).toContain('Session 1')
      expect(debugEl.query(By.css('[well-title]')).nativeElement.textContent).toContain('Session 1')
    })
  })
})