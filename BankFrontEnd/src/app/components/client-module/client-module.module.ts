import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientModuleRoutingModule } from './client-module-routing.module';
import { ClientModuleComponent } from './client-module.component';
import { SharedModule } from '../shared/shared.module';
import { ClientDashboardComponent } from './client-dashboard/client-dashboard.component';
import { NewAccountComponent } from './new-account/new-account.component';
import { TransferComponent } from './transfer/transfer.component';
import { NgbProgressbarModule } from '@ng-bootstrap/ng-bootstrap';
import { DepositComponent } from './deposit/deposit.component';
import { GetLoanComponent } from './get-loan/get-loan.component';




@NgModule({
  declarations: [
    ClientModuleComponent,
    ClientDashboardComponent,
    NewAccountComponent,
    TransferComponent,
    DepositComponent,
    GetLoanComponent,
  ],
  imports: [
    CommonModule,
    ClientModuleRoutingModule,
    SharedModule,
    NgbProgressbarModule
  ]
})
export class ClientModuleModule { }
