import { Participant } from "./Participant";

export interface Match {
  giver: Participant;
  receiver: Participant | undefined;
}