import { Injectable } from "@angular/core";
import { ISession } from "../shared";

@Injectable()
export class VoterService {
  deleteVoter(session: ISession, userName?: string): void {
    session.voters = session.voters.filter((voter: string) => voter !== userName);
  }
  
  addVoter(session: ISession, userName?: string): void {
    if (userName) {
      session.voters.push(userName);
    }
  }

  userHasVoted(session: ISession, userName?: string) {
    return session.voters.some((voter: string) => voter === userName);
  }
}