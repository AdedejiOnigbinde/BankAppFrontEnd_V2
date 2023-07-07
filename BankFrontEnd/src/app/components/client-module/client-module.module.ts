import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientModuleRoutingModule } from './client-module-routing.module';
import { ClientModuleComponent } from './client-module.component';
import { SharedModule } from '../shared/shared.module';
import { ClientDashboardComponent } from './client-dashboard/client-dashboard.component';
import { NewAccountComponent } from './new-account/new-account.component';





@NgModule({
  declarations: [
    ClientModuleComponent,
    ClientDashboardComponent,
    NewAccountComponent,
  ],
  imports: [
    CommonModule,
    ClientModuleRoutingModule,
    SharedModule
  ]
})
export class ClientModuleModule { }
