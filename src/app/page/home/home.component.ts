import { Component, OnInit, ViewChild } from "@angular/core";
import {
  Banner,
  HotTag,
  SongSheet,
  Singer
} from "src/app/service/types/common";
import { NzCarouselComponent } from "ng-zorro-antd";
import { ActivatedRoute } from "@angular/router";
import { map } from "rxjs/operators";
import { SheetService } from "src/app/service/sheet.service";

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
    private route: ActivatedRoute,
    private sheetService: SheetService
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

  onPlaySheet(id: number) {
    console.log(id);
    this.sheetService.playSheet(id).subscribe(playlist => {
      console.log(playlist);
    });
  }
}
