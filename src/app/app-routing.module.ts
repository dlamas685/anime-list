import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailComponent } from './anime/page/detail/detail.component';
import { FavoritesComponent } from './anime/page/favorites/favorites.component';
import { HomeComponent } from './anime/page/home/home.component';
import { NotFoundComponent } from './misc/page/not-found/not-found.component';
import { CheckInComponent } from './user/page/check-in/check-in.component';
import { LogInComponent } from './user/page/log-in/log-in.component';
import { UserConfigurationComponent } from './user/page/user-configuration/user-configuration.component';

const routes: Routes = [
  {path: '', component:LogInComponent, pathMatch:'full'},
  {path: 'login', component:LogInComponent},
  {path: 'checkin', component:CheckInComponent},
  {path: 'configuration/:id', component:UserConfigurationComponent},
  {path: 'home/:id', component:HomeComponent},
  {path: 'favorites/:id', component:FavoritesComponent},
  {path: 'detail/:id', component:DetailComponent},
  {path: '**', component:NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
