import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Filter, MediaType, MediaFormat, MediaSort } from '../../interfaces/anime';
import { AnimeService } from '../../service/anime.service';
import { LocalStorageService } from '../../service/local-storage.service';

@Component({
  selector: 'app-anime-filters',
  templateUrl: './anime-filters.component.html',
  styleUrls: ['./anime-filters.component.css']
})
export class AnimeFiltersComponent implements OnInit {

  myFilters!: FormGroup;

  order:string = '';

  private _genders:string[] = ['','Action', 'Adventure', 'Comedy', 'Drama', 
  'Ecchi', 'Fantasy', 'Horror', 'Mahou Shoujo', 'Mecha', 'Music', 'Mystery',
  'Psychological','Romance','Sci-Fi', 'Slice of Life','Sports','Supernatural','Thriller'];

  private _years:(number|string)[] = [];

  private _formats:string[] = ['TV', 'Movie', 'TV_Short', 'Special', 'OVA', 'ONA', 'Music'];

  get genders():string[] {
    return this._genders;
  }

  get years():(number|string)[] {
    return this._years;
  }

  get formats():string[] {
    return this._formats;
  }

  get arrayFilter():(string|number)[] {
    return [this.animeSvc.filter.title!, this.animeSvc.filter.genre!,this.animeSvc.filter.seasonYear!,this.animeSvc.filter.format! || 'TV'];
  }

  constructor(private fb: FormBuilder, private animeSvc: AnimeService, private localStorageSvc: LocalStorageService){
    this.initialForm();
  }
  
  ngOnInit(){
    this._years.push('');
    for(let i:number=2022;i>=1990;i--){
      this._years.push(i);
    }
    this.orderPopularity();
  }


  public filterAnime():void{
    let filter:Filter = this.myFilters.value;
    if (filter.title === '') filter.title = null;
    if (filter.genre === '') filter.genre = null;
    if (filter.seasonYear === '') filter.seasonYear = null;
    filter.type = MediaType.ANIME;
    this.animeSvc.filter = filter;
    this.animeSvc.getAnimes();
  }


  private initialForm():void{
    const filter: Filter = this.animeSvc.filter;
    this.myFilters =  this.fb.group({
      title: [filter.title || ''],
      genre: [filter.genre || ''],
      seasonYear: [filter.seasonYear || ''],
      format: [filter.format?.toString() || 'TV']
    });
  }

  public orderTitle():void {
    this.order = 'Nombre'
    this.animeSvc.sort = [MediaSort.TITLE_ROMAJI];
    this.animeSvc.getAnimes();
  }

  public orderPopularity():void {
    this.order = 'Popularidad'
    this.animeSvc.sort = [MediaSort.POPULARITY_DESC];
    this.animeSvc.getAnimes();
  }
}
