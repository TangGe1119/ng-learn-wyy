import { Injectable, Inject } from "@angular/core";
import { ServiceModule } from "./service.module";
import { Observable } from "rxjs";
import { Banner, HotTag, SongSheet } from "./types/common";
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
    return this.http
      .get(`${this.uri}/banner`)
      .pipe(map((res: { banners: Banner[] }) => res.banners));
  }

  getHotTags(): Observable<HotTag[]> {
    return this.http
      .get(`${this.uri}/playlist/hot`)
      .pipe(
        map((res: { tags: HotTag[] }) =>
          res.tags.sort((a, b) => a.position - b.position).slice(0, 5)
        )
      );
  }

  getPersonalSheetList(): Observable<SongSheet[]> {
    return this.http
      .get(`${this.uri}/personalized`)
      .pipe(map((res: { result: SongSheet[] }) => res.result.slice(0, 16)));
  }
}
