import { DebugElement } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { AuthService } from "src/app/user/auth.service"
import { SessionListComponent } from "./session-list.component";
import { VoterService } from "./voter.service";

describe('SessionListComponent', () => {
  
  let mockAuthService: AuthService;
  let mockVoterService: VoterService;
  let fixture: ComponentFixture<SessionListComponent>;
  let component: SessionListComponent;
  let element: HTMLElement;
  let debugEl: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        SessionListComponent
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
      ]
    });
    fixture = TestBed.createComponent(SessionListComponent);
    component = fixture.componentInstance;
    debugEl = fixture.debugElement;
    element = fixture.nativeElement;
  })
  
  describe('initial display', () => {

  })
})