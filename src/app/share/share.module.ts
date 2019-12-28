import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NgZorroAntdModule } from "ng-zorro-antd";
import { FormsModule } from "@angular/forms";
import { WyUiModule } from "./wy-ui/wy-ui.module";
import { PlayTimePipe } from "./wy-ui/play-time.pipe";

@NgModule({
  imports: [CommonModule, NgZorroAntdModule, FormsModule, WyUiModule],
  exports: [CommonModule, NgZorroAntdModule, FormsModule, WyUiModule],
  declarations: []
})
export class ShareModule {}
