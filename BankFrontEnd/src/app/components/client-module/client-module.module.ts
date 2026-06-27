import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms'; 

import { ClientModuleRoutingModule } from './client-module-routing.module';
import { ClientModuleComponent } from './client-module.component';
import { SharedModule } from '../shared/shared.module';
import { ClientDashboardComponent } from './client-dashboard/client-dashboard.component';
import { NewAccountComponent } from './new-account/new-account.component';
import { TransferComponent } from './transfer/transfer.component';
import { NgbProgressbarModule } from '@ng-bootstrap/ng-bootstrap';
import { DepositComponent } from './deposit/deposit.component';
import { GetLoanComponent } from './get-loan/get-loan.component';
import { PayLoanComponent } from './pay-loan/pay-loan.component';

@NgModule({
  declarations: [
    ClientModuleComponent,
    ClientDashboardComponent,
    NewAccountComponent,
    TransferComponent,
    DepositComponent,
    GetLoanComponent,
    PayLoanComponent,
  ],
  imports: [
    CommonModule,
    ClientModuleRoutingModule,
    SharedModule,
    NgbProgressbarModule,
    ReactiveFormsModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ClientModuleModule { }
