import {
  Component,
  OnInit,
  Input,
  SimpleChanges,
  OnChanges,
  ChangeDetectionStrategy
} from "@angular/core";

@Component({
  selector: "app-wy-slider-track",
  template: `
    <div
      class="wy-slider-track"
      [ngStyle]="style"
      [class.buffer]="wyBuffer"
    ></div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WyTrackComponent implements OnInit, OnChanges {
  @Input() wyVertical = false;
  @Input() wyOffset: number;
  @Input() wyBuffer = false;

  style = {};

  constructor() {}

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes["wyOffset"]) {
      this.style[this.wyVertical ? "height" : "width"] = this.wyOffset + "%";
    }
  }
}
