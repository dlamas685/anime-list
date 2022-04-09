import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appBadgeGenres]'
})
export class BadgeGenresDirective implements OnInit {


  @Input() appBadgeGenres: string = '';

  private genresClass:any [] = [
    {name:'Action', class: 'bg-primary'},
    {name:'Adventure', class: 'bg-danger'},
    {name:'Comedy', class: 'bg-warning'},
    {name:'Drama', class: 'bg-drama'},
    {name:'Ecchi', class: 'bg-ecchi'},
    {name:'Fantasy', class: 'bg-success'},
    {name:'Horror', class: 'bg-horror'},
    {name:'Mahou Shoujo', class: 'bg-mahou-shoujo'},
    {name:'Mecha', class: 'bg-mecha'},
    {name:'Music', class: 'bg-music'},
    {name:'Mystery', class: 'bg-mystery'},
    {name:'Psychological', class: 'bg-dark'},
    {name:'Romance', class: 'bg-romance'},
    {name:'Sci-Fi', class: 'bg-sci-fi'},
    {name:'Slice of Life', class: 'bg-slice-of-life'},
    {name:'Sports', class: 'bg-sports'},
    {name:'Supernatural', class: 'bg-supernatural'},
    {name:'Thriller', class: 'bg-thriller'}
  ];

  constructor(private elementRef: ElementRef, private renderer: Renderer2) { }

  ngOnInit() {
    this.setColorsBadge();
  }

  setColorsBadge(): void {

    const badge = this.genresClass.find(x => x.name === this.appBadgeGenres);

    if (badge){
      this.renderer.addClass(this.elementRef.nativeElement,badge.class);
    }
    else {
      this.renderer.addClass(this.elementRef.nativeElement,'bg-light');
    }

  }



}
