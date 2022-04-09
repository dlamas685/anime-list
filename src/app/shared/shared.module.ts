import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { AsideComponent } from './aside/aside.component';
import { RouterModule } from '@angular/router';
import { ScrollButtonComponent } from './scroll-button/scroll-button.component';



@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    AsideComponent,
    ScrollButtonComponent
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    AsideComponent,
    ScrollButtonComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class SharedModule { }
