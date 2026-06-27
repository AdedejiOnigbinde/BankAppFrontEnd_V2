import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminModuleComponent } from './admin-module.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminClientsComponent } from './admin-clients/admin-clients.component';
import { AdminAccountsComponent } from './admin-accounts/admin-accounts.component';
import { AdminLoansComponent } from './admin-loans/admin-loans.component';
import { AdminDepositsComponent } from './admin-deposits/admin-deposits.component';

const routes: Routes = [
  {
    path: '', component: AdminModuleComponent, children: [
      { path: '',         component: AdminDashboardComponent },
      { path: 'clients',  component: AdminClientsComponent },
      { path: 'accounts', component: AdminAccountsComponent },
      { path: 'loans',    component: AdminLoansComponent },
      { path: 'deposits', component: AdminDepositsComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminModuleRoutingModule { }
