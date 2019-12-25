import { Injectable, Inject } from "@angular/core";
import { ServiceModule } from "./service.module";
import { Observable } from "rxjs";
import { Banner } from "./types/common";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import { API_CONFIG } from "./service.module";

@Injectable({
  providedIn: ServiceModule
})
export class HomeService {
  constructor(
    private http: HttpClient,
    @Inject(API_CONFIG) private uri: string
  ) {}

  getBanners(): Observable<Banner[]> {
    console.log(this.uri);
    return this.http
      .get(`${this.uri}/banner`)
      .pipe(map((res: { banners: Banner[] }) => res.banners));
  }
}
