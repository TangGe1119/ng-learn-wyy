import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  Inject,
  OnDestroy
} from "@angular/core";
import { Store, select } from "@ngrx/store";
import { AppStoreModule } from "src/app/store";
import {
  getSongList,
  getPlayList,
  getCurrentIndex,
  getPlayMode,
  getCurrentSong
} from "src/app/store/selectors/player.selector";
import { Song } from "src/app/service/types/common";
import { PlayMode } from "./player-types";
import {
  SetCurrentIndex,
  SetPlayList,
  SetPlayMode
} from "src/app/store/actions/player.action";
import { Subscription, fromEvent } from "rxjs";
import { DOCUMENT } from "@angular/common";

@Component({
  selector: "app-wy-player",
  templateUrl: "./wy-player.component.html",
  styleUrls: ["./wy-player.component.less"]
})
export class WyPlayerComponent implements OnInit, OnDestroy {
  sliderValue = 0;
  buffer = 0;
  volume = 80;
  songList: Song[] = [];
  playList: Song[] = [];
  currentIndex: number = -1;
  playMode: PlayMode;
  currentSong: Song;
  currentTime: number;
  playing = false;
  volumeVisible = false;
  panelVisible = false;

  winSubscription: Subscription;

  @ViewChild("audio", { static: true })
  private audio: ElementRef<HTMLAudioElement>;

  @ViewChild("player", { static: true })
  private playerCtl: ElementRef<HTMLDivElement>;

  constructor(
    private store$: Store<AppStoreModule>,
    @Inject(DOCUMENT) private doc: Document
  ) {
    const playerStore$ = this.store$.pipe(select("player" as any));
    playerStore$.pipe(select(getSongList)).subscribe(list => {
      this.songList = list;
    });
    playerStore$.pipe(select(getPlayList)).subscribe(list => {
      this.playList = list;
    });
    playerStore$.pipe(select(getCurrentIndex)).subscribe(index => {
      this.currentIndex = index;
    });
    playerStore$.pipe(select(getPlayMode)).subscribe(mode => {
      this.playMode = mode;
    });
    playerStore$.pipe(select(getCurrentSong)).subscribe(song => {
      this.currentSong = song;
    });
  }

  ngOnInit() {
    this.winSubscription = fromEvent(this.doc, "click").subscribe(
      (e: MouseEvent) => {
        e.stopPropagation();
        if (!this.playerCtl.nativeElement.contains(e.target as HTMLElement)) {
          this.panelVisible = false;
          this.volumeVisible = false;
        }
      }
    );
  }

  ngOnDestroy(): void {
    this.winSubscription && this.winSubscription.unsubscribe();
  }

  onSliderPercentChange(percent: number) {
    if (!this.currentSong) return;
    const ct = ((percent / 100) * this.currentSong.dt) / 1000;
    this.audio.nativeElement.currentTime = ct;
  }

  onToggle() {
    if (!this.currentSong && this.playList.length) {
      this.store$.dispatch(SetCurrentIndex({ currentIndex: 0 }));
    }
    if (this.playing) {
      this.pause();
    } else {
      this.play();
    }
  }

  onCanPlay() {
    this.play();
  }

  onTimeUpdate(event: Event) {
    this.currentTime = (<HTMLAudioElement>event.target).currentTime * 1000;
    this.sliderValue = (this.currentTime / this.currentSong.dt) * 100;
  }

  onProgress() {
    this.buffer =
      ((this.audio.nativeElement.buffered.end(0) * 1000) /
        this.currentSong.dt) *
      100;
  }

  onSongChange(num: number) {
    const index = this.currentIndex + num;
    const i = index >= this.playList.length ? 0 : index;
    // 单曲循环
    if (this.playList.length === 1) {
      this.audio.nativeElement.currentTime = 0;
    } else {
      this.store$.dispatch(SetCurrentIndex({ currentIndex: i }));
    }
  }

  onEnd() {
    this.onSongChange(1);
  }

  toggleVolumeVisible(e: Event) {
    e.stopPropagation();
    this.volumeVisible = !this.volumeVisible;
  }

  togglePanelVisible(e: Event) {
    e.stopPropagation();
    this.panelVisible = !this.panelVisible;
  }

  onPanelClose() {
    this.panelVisible = false;
  }

  changeMode() {
    let playMode: PlayMode;
    let playList: Song[];
    switch (this.playMode.type) {
      case "loop":
        playMode = { type: "random", name: "随机" };
        playList = this.shuffle(this.songList);
        break;
      case "random":
        playMode = { type: "single", name: "单曲" };
        playList = [this.currentSong];
        break;
      case "single":
        playMode = { type: "loop", name: "循环" };
        playList = this.songList;
        break;
    }
    this.store$.dispatch(SetPlayMode({ playMode }));
    this.store$.dispatch(SetPlayList({ playList }));
    this.store$.dispatch(SetCurrentIndex({ currentIndex: 0 }));
  }

  onChangeSong(song: number) {
    this.onSongChange(song);
  }

  private play() {
    this.audio.nativeElement.play();
    this.playing = true;
  }

  private pause() {
    this.audio.nativeElement.pause();
    this.playing = false;
  }

  private shuffle(arr: any[]) {
    const arrCopy = [...arr];
    var result = [],
      random;
    while (arrCopy.length > 0) {
      random = Math.floor(Math.random() * arrCopy.length);
      result.push(arrCopy[random]);
      arrCopy.splice(random, 1);
    }
    return result;
  }

  get picUrl() {
    return this.currentSong
      ? this.currentSong.al.picUrl
      : "http://s4.music.126.net/style/web2/img/default/default_album.jpg";
  }

  get playVolume() {
    return this.volume / 100;
  }
}
