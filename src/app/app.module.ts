import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AnimeModule } from './anime/anime.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GraphQLModule } from './graphql.module';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserModule } from './user/user.module';

@NgModule({
  declarations: [
    AppComponent
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
    AnimeModule,
    UserModule,
    GraphQLModule,
    HttpClientModule
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
