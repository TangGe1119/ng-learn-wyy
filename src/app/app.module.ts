import { NgModule } from "@angular/core";

import { AppComponent } from "./app.component";
import { CoreModule } from "./core/core.module";
import { AppStoreModule } from "./store";

@NgModule({
  declarations: [AppComponent],
  imports: [CoreModule, AppStoreModule],
  bootstrap: [AppComponent]
})
export class AppModule {}
