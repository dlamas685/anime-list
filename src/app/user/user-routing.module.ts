import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LogInComponent } from './page/log-in/log-in.component';
import { CheckInComponent } from './page/check-in/check-in.component';

const routes:Routes = [
  {
    path: '',
    children: [
      {path: 'login', component: LogInComponent},
      {path: 'checkin', component: CheckInComponent},
      {path: '**', redirectTo:'login'}
    ]
  }
]

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class UserRoutingModule { }
