import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { WyPlayerComponent } from "./wy-player.component";
import { WySliderModule } from "../wy-slider/wy-slider.module";
import { FormsModule } from "@angular/forms";
import { PlayTimePipe } from "../play-time.pipe";

@NgModule({
  declarations: [WyPlayerComponent, PlayTimePipe],
  imports: [CommonModule, FormsModule, WySliderModule],
  exports: [WyPlayerComponent]
})
export class WyPlayerModule {}
