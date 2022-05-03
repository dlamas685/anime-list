import { Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-filter-select',
  templateUrl: './filter-select.component.html',
  styleUrls: ['./filter-select.component.css']
})
export class FilterSelectComponent{

  @Input() dropdown_items:string [] = [];
  @Input() dropdown_name:string = '';
  @Output() onFilterDropdown: EventEmitter<string> = new EventEmitter();

  dropdown_value:string = '';

  constructor() { }

  public filterAnime():void {
    this.onFilterDropdown.emit(this.dropdown_value);
  }
}
