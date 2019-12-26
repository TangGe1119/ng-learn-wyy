import { Injectable } from "@angular/core";
import { Resolve } from "@angular/router";
import { HomeService } from "src/app/service/home.service";
import { SingerService } from "src/app/service/singer.service";
import {
  Banner,
  HotTag,
  SongSheet,
  Singer
} from "src/app/service/types/common";
import { forkJoin, Observable } from "rxjs";
import { map, first } from "rxjs/operators";

type ResolveData = {
  banners: Banner[];
  tags: HotTag[];
  sheets: SongSheet[];
  singers: Singer[];
};

@Injectable()
export class HomeResolverService implements Resolve<ResolveData> {
  constructor(
    private homeService: HomeService,
    private singerService: SingerService
  ) {}

  resolve(): Observable<ResolveData> {
    return forkJoin([
      this.homeService.getBanners(),
      this.homeService.getHotTags(),
      this.homeService.getPersonalSheetList(),
      this.singerService.getEnterSingers()
    ]).pipe(
      map(([banners, tags, sheets, singers]) => ({
        banners,
        tags,
        sheets,
        singers
      })),
      first()
    );
  }
}
