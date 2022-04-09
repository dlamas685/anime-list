import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { BehaviorSubject, map, Observable, pluck, take, tap, withLatestFrom, of } from 'rxjs';
import { Data, Filter, Media } from '../interfaces/anime';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AnimeService {

  private animesSubject = new BehaviorSubject<Media[]>([]);

  private popularesSubject = new BehaviorSubject<Media[]>([]);

  private animeSubject = new BehaviorSubject<Media>(null!);

  private _animes$ = this.animesSubject.asObservable();

  private _populares$ = this.popularesSubject.asObservable();

  private _anime$ = this.animeSubject.asObservable();

  private _filter:Filter = {};

  get animes$(): Observable<Media[]> {
    return this._animes$;
  }

  get populares$(): Observable<Media[]> {
    return this._populares$;
  }

  get anime$(): Observable<Media>{
    return this._anime$;
  }

  constructor(private apollo: Apollo, private localStorageSvc: LocalStorageService) {}

  public getAnimesPopular(){
    const QUERY = gql`
    {
      Page (page:1 perPage:8) {
        media ( type: ANIME sort:POPULARITY_DESC) {
          id
          title {
            romaji
            userPreferred
          }
          coverImage {
            extraLarge
            large
          }
        }
      }
    }
    `;

    this.apollo.watchQuery<Data>({
      query: QUERY
    }).valueChanges.pipe(
      take(1),
      tap(({ data }) => {
        const { Page } = data;
        this.animesSubject.next(Page.media);
      })
    ).subscribe();
    
  }

  public getAnimePerPage(pageNum:number):void {
    const QUERY = gql` 
    query ($page: Int, $perPage: Int, $search: String, $genre: String, $seasonYear: Int, $format:MediaFormat, $type: MediaType) {
      Page (page: $page, perPage: $perPage) {
        pageInfo {
          total
          currentPage
          lastPage
          hasNextPage
          perPage
        }
        media (search: $search, genre: $genre, seasonYear: $seasonYear, format: $format, type: $type, sort:POPULARITY_DESC) {
          id
          title {
            romaji
          }
          coverImage{
            extraLarge
            large
          }
        }
      }
    }
    `;
    let VARIABLES = {
      page:pageNum,
      perPage:8,
      search: this._filter.title,
      genre: this._filter.genre,
      seasonYear: this._filter.seasonYear,
      format: this._filter.format,
      type: this._filter.type
    }
    this.apollo.watchQuery<any>({
      query:QUERY,
      variables:VARIABLES
    }).valueChanges.pipe(
      take(1),
      pluck('data', 'Page', 'media'),
      withLatestFrom(this._animes$),
      tap(([apiResponse, media]) => {
        this.animesSubject.next([...media, ...apiResponse]);
      })
    ).subscribe();
  }

  public getAnimes(filter:Filter): void {

    this._filter = filter;

    let QUERY = gql`
    query ($page: Int, $perPage: Int, $search: String, $genre: String, $seasonYear: Int, $format:MediaFormat, $type: MediaType) {
      Page (page: $page, perPage: $perPage) {
        pageInfo {
          total
          currentPage
          lastPage
          hasNextPage
          perPage
        }
        media (search: $search, genre: $genre, seasonYear: $seasonYear, format: $format, type: $type, sort:POPULARITY_DESC) {
          id
          title {
            romaji
          }
          coverImage{
            extraLarge
            large
          }
        }
      }
    }  
    `;
    let VARIABLES = {
      page:1,
      perPage:8,
      search: filter.title,
      genre: filter.genre,
      seasonYear: filter.seasonYear,
      format: filter.format,
      type: filter.type
    }
    this.apollo.watchQuery<Data>({
      query: QUERY,
      variables:VARIABLES
    }).valueChanges.pipe(
      take(1),
      tap(({ data }) => {
        const { Page } = data;
        this.animesSubject.next(Page.media); 
      })
    ).subscribe();
  }

  public getTopAnimes():void {
    const QUERY = gql`
    {
      Page (page:1 perPage:10) {
        media ( type: ANIME popularity_greater:276414 sort:POPULARITY_DESC status:FINISHED) {
          id
          title {
            romaji
            userPreferred
          }
          genres
          seasonYear
          coverImage {
            extraLarge
            large
          }
          popularity
          status
          isAdult
        }
      }
    }
    `;

    this.apollo.watchQuery<Data>({
      query: QUERY
    }).valueChanges.pipe(
      take(1),
      tap(({ data }) => {
        const { Page } = data;
        this.popularesSubject.next(Page.media);
      })
    ).subscribe();
  }

  public getAnime(id:number):void{
    const QUERY = gql`
    {
      Media (id:${id}) {
        id
        title {
          romaji
          userPreferred
          english
          native
        }
        description
        source
        season
        genres
        seasonYear
        episodes
        bannerImage
        coverImage {
          extraLarge
          large
          medium
          color
        }
        countryOfOrigin
        format
        tags{
          id
          name
        }
        status
        popularity
        isAdult
        type
        trailer{
          id
        }
      }
    }
    `;
    this.apollo.watchQuery<Data>({
      query: QUERY
    }).valueChanges.pipe( 
      map(({data}) => data.Media),
      tap(media => this.parseMediaData(media))
    ).subscribe();
  }

  private parseMediaData(anime: Media):void {
    const currentsFav = this.localStorageSvc.getFavorites();
    const found = !!currentsFav.find((fav:Media)=> fav.id === anime.id);
    const newData = {...anime, isFavorite:found}
    this.animeSubject.next(newData);
  }
}
