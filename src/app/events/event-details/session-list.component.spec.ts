import { AuthService } from "src/app/user/auth.service";
import { IEvent, ISession } from "../shared";
import { SessionListComponent } from "./session-list.component"
import { VoterService } from "./voter.service";

describe('SessionListComponent', () => {
  let component:SessionListComponent;
  let mockAuthService: AuthService;
  let mockVoterService: VoterService;

  beforeEach(() => {
    component = new SessionListComponent(mockAuthService, mockVoterService);
  })

  describe('ngOnChanges', () => {
    it('should filter the sessions correctly', () => {
      component.sessions = <ISession[]> [
        {
          name: 'session 1',
          level: 'intermediate'
        },
        {
          name: 'session 2',
          level: 'intermediate'
        },
        {
          name: 'session 3',
          level: 'beginner'
        }
      ];
      component.filterBy = 'intermediate';
      component.sortBy = 'name';
      component.event = <IEvent> {
        id: 3
      };

      component.ngOnChanges();

      expect(component.visibleSessions.length).toBe(2);
    })
  })
})