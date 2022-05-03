import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-search-input',
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.css']
})
export class SearchInputComponent{

  @Output() onSearch: EventEmitter<string> = new EventEmitter();
  input_value:string = "";
  
  constructor() { }

  public filterAnime(): void {
    this.onSearch.emit(this.input_value);
  }

}
