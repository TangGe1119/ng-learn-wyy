import { Component, OnInit, ViewChild } from "@angular/core";
import { HomeService } from "src/app/service/home.service";
import {
  Banner,
  HotTag,
  SongSheet,
  Singer
} from "src/app/service/types/common";
import { NzCarouselComponent } from "ng-zorro-antd";
import { SingerService } from "src/app/service/singer.service";
import { ActivatedRoute } from "@angular/router";
import { map } from "rxjs/operators";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.less"]
})
export class HomeComponent implements OnInit {
  banners: Banner[];
  tags: HotTag[];
  sheets: SongSheet[];
  singers: Singer[];
  carouselActiveIndex = 0;

  @ViewChild(NzCarouselComponent, { static: true })
  private nzCarousel: NzCarouselComponent;

  constructor(
    private homeService: HomeService,
    private singerService: SingerService,
    private route: ActivatedRoute
  ) {
    this.route.data
      .pipe(map(res => res.homeDatas))
      .subscribe(({ banners, tags, sheets, singers }) => {
        this.banners = banners;
        this.tags = tags;
        this.sheets = sheets;
        this.singers = singers;
      });
  }

  ngOnInit() {}

  OnBeforeChange({ to }) {
    this.carouselActiveIndex = to;
  }

  changeSlide(type: string) {
    this.nzCarousel[type]();
  }
}
