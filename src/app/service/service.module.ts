import { NgModule, InjectionToken } from "@angular/core";

export const API_CONFIG = new InjectionToken("ApiConfigToken");

@NgModule({
  declarations: [],
  imports: [],
  providers: [
    {
      provide: API_CONFIG,
      useValue: "http://111.231.86.149:3000"
    }
  ]
})
export class ServiceModule {}
