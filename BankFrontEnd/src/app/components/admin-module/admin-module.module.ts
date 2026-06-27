import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AdminModuleRoutingModule } from './admin-module-routing.module';
import { AdminModuleComponent } from './admin-module.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminClientsComponent } from './admin-clients/admin-clients.component';
import { AdminAccountsComponent } from './admin-accounts/admin-accounts.component';
import { AdminLoansComponent } from './admin-loans/admin-loans.component';
import { AdminDepositsComponent } from './admin-deposits/admin-deposits.component';

@NgModule({
  declarations: [
    AdminModuleComponent,
    AdminDashboardComponent,
    AdminClientsComponent,
    AdminAccountsComponent,
    AdminLoansComponent,
    AdminDepositsComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    AdminModuleRoutingModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AdminModuleModule { }
