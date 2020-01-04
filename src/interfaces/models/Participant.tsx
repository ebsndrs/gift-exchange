import { Gender } from "./Gender";

export interface Participant {
  name: string;
  age: number | undefined;
  gender: Gender | undefined;
  household: string | undefined;
  exclusions: Participant[] | undefined;
}