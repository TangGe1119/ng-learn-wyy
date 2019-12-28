import { createAction, props } from "@ngrx/store";
import { Song } from "src/app/service/types/common";
import { PlayMode } from "src/app/share/wy-ui/wy-player/player-types";

export const SetPlaying = createAction(
  "[player] SetPlaying",
  props<{ playing: boolean }>()
);

export const SetPlayList = createAction(
  "[player] SetPlayList",
  props<{ playList: Song[] }>()
);

export const SetSongList = createAction(
  "[player] SetSongList",
  props<{ songList: Song[] }>()
);

export const SetPlayMode = createAction(
  "[player] SetPlayMode",
  props<{ playMode: PlayMode }>()
);

export const SetCurrentIndex = createAction(
  "[player] SetCurrentIndex",
  props<{ currentIndex: number }>()
);
