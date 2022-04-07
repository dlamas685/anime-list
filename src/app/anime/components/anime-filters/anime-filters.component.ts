import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Filter, MediaType } from '../../interfaces/anime';
import { AnimeService } from '../../service/anime.service';

@Component({
  selector: 'app-anime-filters',
  templateUrl: './anime-filters.component.html',
  styleUrls: ['./anime-filters.component.css']
})
export class AnimeFiltersComponent implements OnInit {

  miFiltros: FormGroup = this.fb.group({
    search: [''],
    genre: ['---'],
    year: ['---']
  })

  private _genders:string[] = ['Action', 'Adventure', 'Comedy', 'Drama', 'Ecchi', 'Fantasy', 'Horror', 'Mecha', 'Music','Sci-Fi', 'Slice of Life', 'Romance'];

  private _years:number[] = [];

  private filter:Filter = {};

  constructor(private fb: FormBuilder, private animeService: AnimeService){}
  
  ngOnInit(){
    for(let i:number=2022;i>=1990;i--){
      this._years.push(i);
    }
    this.miFiltros.reset( {
      search: '',
      genre: '---',
      year: '---'
    });
  }

  get genders():string[] {
    return this._genders;
  }

  get years():number[] {
    return this._years;
  }

  public filtrarAnime():void{
    if (this.miFiltros.controls['search'].value ==='' && this.miFiltros.controls['genre'].value === "---" && this.miFiltros.controls['year'].value === "---"){
      return;
    }
    else {
      if (this.miFiltros.controls['search'].value.trim().length != 0) {
        this.filter.title = this.miFiltros.controls['search'].value;
      }
      if (this.miFiltros.controls['genre'].value != "---") {
        this.filter.genre = this.miFiltros.controls['genre'].value;
      }
      if (this.miFiltros.controls['year'].value != "---") {
        this.filter.seasonYear = this.miFiltros.controls['year'].value;
      }
      this.filter.type = MediaType.ANIME;
      this.animeService.establecerParametros(this.filter);
      this.animeService.establecerHistorial(this.filter);
      this.animeService.filtrarAnimes();
      this.filter = {};
    }

  }
}
