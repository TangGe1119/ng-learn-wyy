import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "playTime"
})
export class PlayTimePipe implements PipeTransform {
  transform(value: any, ...args: any[]): any {
    if (!value) return "0:00";
    const m = Math.floor(value / 1000 / 60);
    const s = Math.floor((value / 1000) % 60)
      .toString()
      .padStart(2, "0");
    return `${m}:${s}`;
  }
}
