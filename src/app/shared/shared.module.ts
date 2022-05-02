//MODULOS
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//COMPONENTES
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { AsideComponent } from './aside/aside.component';



@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    AsideComponent
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    AsideComponent
  ],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }
