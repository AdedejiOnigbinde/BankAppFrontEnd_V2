import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientModuleComponent } from './client-module.component';
import { ClientDashboardComponent } from './client-dashboard/client-dashboard.component';

const routes: Routes = [
  {
    path: "", component: ClientModuleComponent, children: [
      { path: "", component: ClientDashboardComponent }
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientModuleRoutingModule { }
