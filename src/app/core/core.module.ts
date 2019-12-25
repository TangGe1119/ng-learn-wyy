import { NgModule, SkipSelf, Optional } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { BrowserModule } from "@angular/platform-browser";
import { registerLocaleData } from "@angular/common";
import zh from "@angular/common/locales/zh";
import { NZ_I18N, zh_CN } from "ng-zorro-antd";

import { AppRoutingModule } from "../app-routing.module";
import { ServiceModule } from "../service/service.module";
import { PageModule } from "../page/page.module";
import { ShareModule } from "../share/share.module";

registerLocaleData(zh);

@NgModule({
  declarations: [],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    PageModule,
    ServiceModule,
    ShareModule,
    AppRoutingModule
  ],
  exports: [ShareModule, AppRoutingModule],
  providers: [{ provide: NZ_I18N, useValue: zh_CN }]
})
export class CoreModule {
  // 自己注入自己，如果在AppMoudule引入之前，CoreModule没有引入，就不能注入；之后再有其他模块引入的话，就会报错
  constructor(@SkipSelf() @Optional() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error("CoreModule can be only imported by AppModule");
    }
  }
}
