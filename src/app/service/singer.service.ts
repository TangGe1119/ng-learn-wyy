import { Injectable, Inject } from "@angular/core";
import { ServiceModule, API_CONFIG } from "./service.module";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Singer } from "./types/common";
import { map } from "rxjs/operators";
import queryString from "query-string";

type SingerParams = { offset: number; limit: number; cat?: string };

const defaultSingerParams: SingerParams = { offset: 0, limit: 9, cat: "5001" };

@Injectable({
  providedIn: ServiceModule
})
export class SingerService {
  constructor(
    private http: HttpClient,
    @Inject(API_CONFIG) private uri: string
  ) {}

  getEnterSingers(args: SingerParams = defaultSingerParams) {
    const params = new HttpParams({ fromString: queryString.stringify(args) });
    return this.http
      .get(`${this.uri}/artist/list`, { params })
      .pipe(map((res: { artists: Singer[] }) => res.artists));
  }
}
