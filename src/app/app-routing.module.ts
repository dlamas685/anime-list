import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './misc/page/not-found/not-found.component';


const routes: Routes = [
  {path: '', redirectTo: '404', pathMatch:'full'},
  {path: 'user', loadChildren:()=>import('./user/user.module').then(m => m.UserModule)},
  {path: 'anime', loadChildren: () => import('./anime/anime.module').then(m => m.AnimeModule)},
  {path: '404', component:NotFoundComponent},
  {path: '**', redirectTo:'404'}
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
