import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Observable } from 'rxjs';
import { Filter, Media } from '../interfaces/anime';

const FAVORITES = 'favorites'
const VISITED = 'visited'

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  private animesFavoritesSubject = new BehaviorSubject<Media[]>([]);

  private _animesFavorites$ = this.animesFavoritesSubject.asObservable();

  private visitedSubject = new BehaviorSubject<Media[]>([]);
  
  private _visited$ = this.visitedSubject.asObservable();

  get animesFavorites$(): Observable<Media[]> {
    return this._animesFavorites$;
  }

  get visited$(): Observable<Media[]> {
    return this._visited$;
  }

  constructor(private toastrSvc: ToastrService) { 
    this.intialStorageFav();
    this.intialStorageVisited();
  }

  private intialStorageFav():void{
    const currents = JSON.parse(localStorage.getItem(FAVORITES)!);
    if(!currents){
      localStorage.setItem(FAVORITES, JSON.stringify([]));
    }
    this.getFavorites();
  }
 
  public getFavorites():any{
    try {
      const mediasFavorites = JSON.parse(localStorage.getItem(FAVORITES)!);
      this.animesFavoritesSubject.next(mediasFavorites);
      return mediasFavorites;
    }
    catch(e) {
      console.log('Error obteniendo Local Storage:', e);
    }
  }

  public addOrRemoveFevorite(media:Media): void{
    const {id} = media;
    const currentsFav = this.getFavorites();
    const found = !! currentsFav.find((fav: Media) => fav.id === id);
    found ? this.removeFromFavorites(media) : this.addToFavorites(media);
  }

  private addToFavorites(media: Media): void {
    try{
      const currentsFav = this.getFavorites();
      localStorage.setItem(FAVORITES, JSON.stringify([...currentsFav, media]));
      this.animesFavoritesSubject.next([...currentsFav, media])
      this.toastrSvc.success(`${media.title.romaji} fue añadido a favoritos!`, 'Aniki' );
    }
    catch(e){
      console.log('Error al guardar en Local Storage:', e);
      this.toastrSvc.error(`Error al agregar a favoritos! error: ${e}`, 'Aniki' );
    }

  } 

  private removeFromFavorites(anime:Media): void {
    try{
      const currentsFav = this.getFavorites(); 
      const media = currentsFav.filter((item:Media) => item.id !== anime.id);
      localStorage.setItem(FAVORITES, JSON.stringify([...media]));
      this.animesFavoritesSubject.next([...media]);
      this.toastrSvc.info(`${anime.title.romaji} fue eliminado de favoritos!`, 'Aniki' );
    }
    catch(e){
      console.log('Error al remover en Local Storage:', e);
      this.toastrSvc.error(`Error al remover de favoritos! error: ${e}`, 'Aniki' );
    }
  }

  private intialStorageVisited():void{
    const currents = JSON.parse(localStorage.getItem(VISITED)!);
    if(!currents){
      localStorage.setItem(VISITED, JSON.stringify([]));
    }
    this.getVisited();
  }

  public getVisited():any{
    try {
      const visited = JSON.parse(localStorage.getItem(VISITED)!);
      this.visitedSubject.next(visited);
      return visited;
    }
    catch(e) {
      console.log('Error obteniendo Local Storage:', e);
    }
  }

  public addToVisited(visited: Media): void {
    try{
      const currentsVisited = this.getVisited();
      const found = !!currentsVisited.find((item:Media) => item.id === visited.id);
      if (!found){
        localStorage.setItem(VISITED, JSON.stringify([visited,...currentsVisited].splice(0,5)));
        this.visitedSubject.next([visited,...currentsVisited].splice(0,5))
      }
    }
    catch(e){
      console.log('Error al guardar en Local Storage:', e);
    }

  } 

  public clearStorage():void{
    try {
       localStorage.clear();
    }
    catch(e){
      console.log('Error limpiando Local Storage:', e);
    }
  }
}
