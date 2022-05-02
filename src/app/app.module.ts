
//MODULOS
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { GraphQLModule } from './graphql.module';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//COMPONENTES
import { AppComponent } from './app.component';
import { NotFoundComponent } from './misc/page/not-found/not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(
      {
        timeOut: 1500,
        closeButton:true,
        progressBar:true,
        easing:'ease-in',
        positionClass: 'toast-bottom-right',
        progressAnimation:'decreasing',
        preventDuplicates: true,
      }
    ),
    GraphQLModule,
    HttpClientModule
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
