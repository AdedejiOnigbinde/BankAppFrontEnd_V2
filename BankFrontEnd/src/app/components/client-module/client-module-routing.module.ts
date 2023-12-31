import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientModuleComponent } from './client-module.component';
import { ClientDashboardComponent } from './client-dashboard/client-dashboard.component';
import { NewAccountComponent } from './new-account/new-account.component';
import { TransferComponent } from './transfer/transfer.component';
import { DepositComponent } from './deposit/deposit.component';

const routes: Routes = [
  {
    path: "", component: ClientModuleComponent, children: [
      { path: "", component: ClientDashboardComponent },
      {path:"newaccount", component:NewAccountComponent},
      {path:"transfer", component:TransferComponent},
      {path:"deposit",component:DepositComponent}
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientModuleRoutingModule { }
