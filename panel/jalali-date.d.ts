// jalali-date.d.ts
declare module "jalali-date" {
  export default class JalaliDate {
    constructor(date?: Date | string);
    jYear(): number;
    jMonth(): number;
    jDate(): number;
  }
}
