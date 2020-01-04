import { Gender } from "../interfaces/models/Gender";

export default class GenderHelper {
  getGendersAsStringArray(): string[] {
    let genderArray: string[] = [];
    for (let i = 0; i < 4; i++) {
      let genderAsString = this.getGenderAsString(i);
      if (genderAsString !== undefined) {
        genderArray.push(genderAsString);
      }
    }

    return genderArray;
  }

  getGenderAsString(enumObj: any): string | undefined {
    for (let name in Gender) {
      if (Gender[name] === enumObj && Gender.hasOwnProperty(name)) {
        return `${name[0].toUpperCase()}${name.slice(1)}`;
      }
    }

    return undefined;
  }
}