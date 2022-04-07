import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogInComponent } from './page/log-in/log-in.component';
import { UserConfigurationComponent } from './page/user-configuration/user-configuration.component';
import { LogDataComponent } from './components/log-data/log-data.component';
import { AccessDataComponent } from './components/access-data/access-data.component';
import { SharedModule } from '../shared/shared.module';
import { CheckInComponent } from './page/check-in/check-in.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    LogInComponent,
    CheckInComponent,
    UserConfigurationComponent,
    LogDataComponent,
    AccessDataComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule
  ]
})
export class UserModule { }
