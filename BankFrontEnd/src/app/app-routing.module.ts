import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { RegisterPageComponent } from './components/register-page/register-page.component';
import { AuthGuard } from './guards/auth.guard';
import { AdminGuard } from './guards/admin.guard';

const routes: Routes = [
  { path: "",        component: LandingPageComponent },
  { path: "login",   component: LoginPageComponent },
  { path: "register", component: RegisterPageComponent },
  { path: "client",  canActivate: [AuthGuard],  loadChildren: () => import('./components/client-module/client-module.module').then(m => m.ClientModuleModule) },
  { path: "admin",   canActivate: [AdminGuard], loadChildren: () => import('./components/admin-module/admin-module.module').then(m => m.AdminModuleModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
