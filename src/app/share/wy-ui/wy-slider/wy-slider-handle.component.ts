import {
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges,
  ChangeDetectionStrategy
} from "@angular/core";

@Component({
  selector: "app-wy-slider-handle",
  template: `
    <div class="wy-slider-handle" [ngStyle]="style"></div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WyHandleComponent implements OnInit, OnChanges {
  @Input() wyVertical = false;
  @Input() wyOffset: number;

  style = {};

  constructor() {}

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes["wyOffset"]) {
      this.style[this.wyVertical ? "bottom" : "left"] = this.wyOffset + "%";
    }
  }
}
