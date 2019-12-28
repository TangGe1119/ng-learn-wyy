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
import { AppStoreModule } from "src/app/store";
import { Store } from "@ngrx/store";
import {
  SetSongList,
  SetPlayList,
  SetCurrentIndex
} from "src/app/store/actions/player.action";

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
    private sheetService: SheetService,
    private store$: Store<AppStoreModule>
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
    this.sheetService.playSheet(id).subscribe(list => {
      this.store$.dispatch(SetSongList({ songList: list }));
      this.store$.dispatch(SetPlayList({ playList: list }));
      this.store$.dispatch(SetCurrentIndex({ currentIndex: 0 }));
    });
  }
}
