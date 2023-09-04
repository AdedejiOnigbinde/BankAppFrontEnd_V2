import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientModuleRoutingModule } from './client-module-routing.module';
import { ClientModuleComponent } from './client-module.component';
import { SharedModule } from '../shared/shared.module';
import { ClientDashboardComponent } from './client-dashboard/client-dashboard.component';
import { NewAccountComponent } from './new-account/new-account.component';
import { GtoLvlCircleModule } from '@gto/lvl-circle';
import { NgChartsModule } from 'ng2-charts';
import { TransferComponent } from './transfer/transfer.component';




@NgModule({
  declarations: [
    ClientModuleComponent,
    ClientDashboardComponent,
    NewAccountComponent,
    TransferComponent,
  ],
  imports: [
    CommonModule,
    ClientModuleRoutingModule,
    SharedModule,
    GtoLvlCircleModule,
    NgChartsModule
  ]
})
export class ClientModuleModule { }
