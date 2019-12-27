import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { WySliderComponent } from "./wy-slider.component";
import { WyTrackComponent } from "./wy-slider-track.component";
import { WyHandleComponent } from "./wy-slider-handle.component";

@NgModule({
  declarations: [WySliderComponent, WyTrackComponent, WyHandleComponent],
  imports: [CommonModule],
  exports: [WySliderComponent]
})
export class WySliderModule {}
