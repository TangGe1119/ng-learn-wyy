import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "playCount"
})
export class PlayCountPipe implements PipeTransform {
  transform(value: number, ...args: any[]): string {
    if (value < 10000) return value.toString();
    return Math.floor(value / 10000) + "万";
  }
}
