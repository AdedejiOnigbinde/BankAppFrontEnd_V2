import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/services/auth-service/auth-service.service';
import { AuthStateService } from 'src/app/services/auth-state/auth-state.service';

@Component({
  selector: 'app-admin-module',
  templateUrl: './admin-module.component.html',
  styleUrls: ['./admin-module.component.css']
})
export class AdminModuleComponent {

  constructor(
    private authService: AuthServiceService,
    private authState: AuthStateService,
    private router: Router
  ) { }

  logout(): void {
    this.authService.logout().subscribe({
      next:  () => this.clearAndRedirect(),
      error: () => this.clearAndRedirect()
    });
  }

  private clearAndRedirect(): void {
    this.authState.clear();
    this.router.navigate(['/login']);
  }
}
