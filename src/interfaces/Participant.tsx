import { Gender } from "./Gender";

export interface Participant {
  name: string;
  dob: Date | undefined;
  gender: Gender | undefined;
  household: string | undefined;
  exclusions: Participant[] | undefined;
}