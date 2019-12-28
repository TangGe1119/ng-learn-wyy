import { PlayState } from "../reducers/player.reducer";
import { createSelector } from "@ngrx/store";

const selectPlayerState = (state: PlayState) => state;

export const getPlaying = createSelector(
  selectPlayerState,
  state => state.playing
);

export const getPlayList = createSelector(
  selectPlayerState,
  state => state.playList
);

export const getSongList = createSelector(
  selectPlayerState,
  state => state.songList
);

export const getPlayMode = createSelector(
  selectPlayerState,
  state => state.playMode
);

export const getCurrentIndex = createSelector(
  selectPlayerState,
  state => state.currentIndex
);

export const getCurrentSong = createSelector(
  selectPlayerState,
  state => state.playList[state.currentIndex]
);
