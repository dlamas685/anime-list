import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { BehaviorSubject, map, Observable, take, tap } from 'rxjs';
import { Data, Filter, Media } from '../interfaces/anime';

@Injectable({
  providedIn: 'root'
})
export class AnimeService {

  
  private animesFiltradosSubject = new BehaviorSubject<Media[]>([]);

  private popularesSubject = new BehaviorSubject<Media[]>([]);

  private _animesFiltrados$ = this.animesFiltradosSubject.asObservable();

  private _populares$ = this.popularesSubject.asObservable();

  private _historial:Filter[] = [];

  private _favoritos:Media[] = [];

  private parameters:string = "";

  constructor(private apollo: Apollo) { 
      
      this._historial = JSON.parse(localStorage.getItem('historial')!) || [];

      this._favoritos = JSON.parse(localStorage.getItem('favoritos')!) || [];

  }

  get historial(){
    return [...this._historial.slice(0,5)];
  }

  get favoritos():Media[] {
    return [...this._favoritos];
  }

  get animesFiltrados$(): Observable<Media[]> {
    return this._animesFiltrados$;
  }

  get populares$(): Observable<Media[]> {
    return this._populares$;
  }

  agregarFavorito(anime:Media): void {
    if(!this._favoritos.includes(anime)){
      this._favoritos.unshift(anime);
      localStorage.setItem('favoritos', JSON.stringify(this._favoritos));
    }
    else {
      this._favoritos = this._favoritos.filter(function(item) {
        return item!== anime; 
      });
      localStorage.setItem('favoritos', JSON.stringify(this._favoritos));
    }
  }


  establecerHistorial(busqueda:Filter):void {
    if(!this._historial.includes(busqueda)){
      this._historial.unshift(busqueda);
      localStorage.setItem('historial', JSON.stringify(this._historial));
    }
  }

  establecerParametros(filter: Filter):void {
      let search:string = "";
      let genre:string = "";
      let seasonYear:string = "";
      let type:string = "";
      if (filter.title !== undefined) {
        search = `search:"${filter.title}"`;
      }
      if (filter.genre !== undefined) {
        genre = `genre:"${filter.genre}"`;
      }
      if(filter.seasonYear !== undefined) {
        seasonYear = `seasonYear:${filter.seasonYear}`;
      }
      if (filter.type !== undefined) {
        type = `type: ${filter.type}`;
      }
      this.parameters= search + " " + genre + " " + seasonYear + " " + type + " sort:POPULARITY_DESC";

  }

  filtrarAnimesPupolares(){
    const QUERY = gql`
    {
      Page (perPage:50) {
        media ( type: ANIME sort:POPULARITY_DESC) {
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
        // this._animesFiltrados = Page.media;
        this.animesFiltradosSubject.next(Page.media);
      })
    ).subscribe();
    
  }

  filtrarAnimes(): void {

    const QUERY = gql`
    {
      Page (perPage:50) {
        media (${this.parameters}) {
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
        this.animesFiltradosSubject.next(Page.media); 
      })
    ).subscribe();
  }

  filtrarCincoAnimes():void {
    const QUERY = gql`
    {
      Page (perPage:8) {
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

  obtenerAnime(id:number):Observable<Media>{
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
      }
    }
    `;

    return this.apollo.watchQuery<Data>({
      query: QUERY
    }).valueChanges.pipe( 
      map(({data}) => data.Media)
    );
    
  }

}
