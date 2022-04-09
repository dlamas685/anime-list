import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Filter, MediaType, MediaFormat } from '../../interfaces/anime';
import { AnimeService } from '../../service/anime.service';
import { LocalStorageService } from '../../service/local-storage.service';

@Component({
  selector: 'app-anime-filters',
  templateUrl: './anime-filters.component.html',
  styleUrls: ['./anime-filters.component.css']
})
export class AnimeFiltersComponent implements OnInit {

  myFilters: FormGroup = this.fb.group({
    title: [''],
    genre: [''],
    seasonYear: [''],
    format: ['TV']
  })

  private _genders:string[] = ['','Action', 'Adventure', 'Comedy', 'Drama', 
  'Ecchi', 'Fantasy', 'Horror', 'Mahou Shoujo', 'Mecha', 'Music', 'Mystery',
  'Psychological','Romance','Sci-Fi', 'Slice of Life','Sports','Supernatural','Thriller'];

  private _years:(number|string)[] = [];

  private _formats:string[] = ['TV', 'Movie', 'TV_Short', 'Special', 'OVA', 'ONA', 'Music'];

  private filter:Filter = {};

  constructor(private fb: FormBuilder, private animeSvc: AnimeService, private localStorageSvc: LocalStorageService){}
  
  ngOnInit(){
    this._years.push('');
    for(let i:number=2022;i>=1990;i--){
      this._years.push(i);
    }
    this.resetForm();
  }

  get genders():string[] {
    return this._genders;
  }

  get years():(number|string)[] {
    return this._years;
  }

  get formats():string[] {
    return this._formats;
  }

  public filterAnime():void{
    this.filter = this.myFilters.value;
    if (this.filter.title === '') this.filter.title = null;
    if (this.filter.genre === '') this.filter.genre = null;
    if (this.filter.seasonYear === '') this.filter.seasonYear = null;
    if (this.filter.format === '') this.filter.format = null;

    console.log(this.filter);
    this.filter.type = MediaType.ANIME;
    this.animeSvc.getAnimes(this.filter);
    this.filter = {};
  }

  private resetForm():void {
    this.myFilters.reset( {
      title: '',
      genre: '',
      seasonYear: '',
      format: 'TV'
    });
  }
}
