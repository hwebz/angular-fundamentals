import { of } from "rxjs";
import { ISession } from "../shared";
import { VoterService } from "./voter.service"

describe('VoterService', () => {
  let voterService: VoterService;
  let mockHttp: any;
  
  beforeEach(() => {
    mockHttp = jasmine.createSpyObj('mockHttp', ['delete', 'post']);
    voterService = new VoterService(mockHttp);
  })

  describe('deleteVoter', () => {
    it('should remove the voter from the list of voters', () => {
      let session = {
        id: 6,
        voters: ['joe', 'john']
      };
      mockHttp.delete.and.returnValue(of(false))

      voterService.deleteVoter(3, <ISession> session, 'joe');

      expect(session.voters.length).toBe(1);
      expect(session.voters[0]).toBe('john');
    })
  })
})