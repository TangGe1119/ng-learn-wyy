import { Injectable, Inject } from "@angular/core";
import { ServiceModule, API_CONFIG } from "./service.module";
import { HttpClient, HttpParams } from "@angular/common/http";
import { SongSheet, SongUrl, Song } from "./types/common";
import { Observable } from "rxjs";
import { map, switchMap } from "rxjs/operators";

@Injectable({
  providedIn: ServiceModule
})
export class SongService {
  constructor(
    private http: HttpClient,
    @Inject(API_CONFIG) private uri: string
  ) {}

  getSongUrl(ids: number[]): Observable<SongUrl[]> {
    const params = new HttpParams().set("id", ids.join(","));
    return this.http
      .get(`${this.uri}/song/url`, { params })
      .pipe(map((res: { data: SongUrl[] }) => res.data));
  }

  getSongList(songs: Song | Song[]): Observable<Song[]> {
    const songArr = Array.isArray(songs) ? songs.slice() : [songs];
    const ids = songArr.map(song => song.id);
    return this.getSongUrl(ids).pipe(
      map(urls => this.genSongList(songArr, urls))
    );
  }

  private genSongList(songs: Song[], urls: SongUrl[]): Song[] {
    const result = [];
    songs.forEach(song => {
      const url = urls.find(url => url.id === song.id);
      if (url) {
        result.push({
          ...song,
          url: url.url
        });
      }
    });
    return result;
  }
}
