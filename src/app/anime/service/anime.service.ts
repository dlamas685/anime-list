import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { BehaviorSubject, map, Observable, pluck, take, tap, withLatestFrom, of } from 'rxjs';
import { Data, Filter, Media, MediaFormat, MediaSort, MediaStatus, MediaType } from '../interfaces/anime';
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

  private _sort: MediaSort[] = [MediaSort.POPULARITY_DESC];

  private _filter:Filter = {
    title: null,
    genre: null,
    seasonYear: null,
    format: MediaFormat.TV,
    type: null
  };

  get animes$(): Observable<Media[]> {
    return this._animes$;
  }

  get populares$(): Observable<Media[]> {
    return this._populares$;
  }

  get anime$(): Observable<Media>{
    return this._anime$;
  }

  get filter():Filter {
    return this._filter;
  }

  set sort(sort:MediaSort[]){
    this._sort = sort;
  }

  set filter(filter: Filter){
    this._filter = filter;
  }

  constructor(private apollo: Apollo, private localStorageSvc: LocalStorageService) {}

  public getAnimes(): void {
    let QUERY = gql`
    query ($page: Int, $perPage: Int, $search: String, $genre: String, $seasonYear: Int, $format:MediaFormat, $type: MediaType, $sort:[MediaSort]) {
      Page (page: $page, perPage: $perPage) {
        pageInfo {
          total
          currentPage
          lastPage
          hasNextPage
          perPage
        }
        media (search: $search, genre: $genre, seasonYear: $seasonYear, format: $format, type: $type, sort:$sort) {
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
      search: this.filter.title,
      genre: this.filter.genre,
      seasonYear: this.filter.seasonYear,
      format: this.filter.format,
      type: (this.filter.type || MediaType.ANIME),
      sort: this._sort
    };

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

  public getAnimePerPage(pageNum:number):void {
    let QUERY = gql` 
    query ($page: Int, $perPage: Int, $search: String, $genre: String, $seasonYear: Int, $format:MediaFormat, $type: MediaType, $sort:[MediaSort]) {
      Page (page: $page, perPage: $perPage) {
        pageInfo {
          total
          currentPage
          lastPage
          hasNextPage
          perPage
        }
        media (search: $search, genre: $genre, seasonYear: $seasonYear, format: $format, type: $type, sort:$sort) {
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
      type: (this.filter.type || MediaType.ANIME),
      sort: this._sort
    };
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

  public getTopAnimes():void {
    let QUERY = gql`
    query ($page: Int, $perPage: Int, $status: MediaStatus, $type: MediaType, $sort: [MediaSort]){
      Page (page:$page, perPage:$perPage) {
        media (type:$type, status:$status, sort:$sort) {
          id
          title {
            romaji
            userPreferred
          }
        }
      }
    }
    `;
    let VARIABLES = {
      page:1,
      perPage:10,
      type: MediaType.ANIME,
      status: MediaStatus.FINISHED,
      sort: [MediaSort.POPULARITY_DESC]
    };
    this.apollo.watchQuery<Data>({
      query: QUERY,
      variables: VARIABLES
    }).valueChanges.pipe(
      take(1),
      tap(({ data }) => {
        const { Page } = data;
        this.popularesSubject.next(Page.media);
      })
    ).subscribe();
  }
  
  public getAnime(idAnime:number):void{
    const QUERY = gql`
    query($id: Int){
      Media (id:$id) {
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
      query: QUERY,
      variables: {
        id: idAnime,
      }
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
