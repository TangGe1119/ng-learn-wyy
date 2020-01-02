import {
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges,
  Output,
  EventEmitter,
  ViewChildren,
  QueryList
} from "@angular/core";
import { Song } from "src/app/service/types/common";
import { WyScrollComponent } from "../wy-scroll/wy-scroll.component";

@Component({
  selector: "app-wy-player-panel",
  templateUrl: "./wy-player-panel.component.html",
  styleUrls: ["./wy-player-panel.component.less"]
})
export class WyPlayerPanelComponent implements OnInit, OnChanges {
  @Input() songList: Song[];
  @Input() currentSong: Song;
  @Input() currentIndex: number;
  @Input() visible: boolean;
  @Output() panelClose = new EventEmitter();
  @Output() songPlay = new EventEmitter<number>();
  @ViewChildren(WyScrollComponent) private wyScroll: QueryList<
    WyScrollComponent
  >;

  constructor() {}

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges) {
    console.log(this.wyScroll);
    if (changes.songList) {
    }
    if (changes.currentSong) {
      console.log(this.currentSong);
    }
    if (changes.visible) {
      if (!changes.visible.firstChange && this.visible) {
        this.wyScroll.first.refresh();
      }
    }
  }
}
