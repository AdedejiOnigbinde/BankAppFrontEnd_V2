import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/services/auth-service/auth-service.service';
import { AuthStateService } from 'src/app/services/auth-state/auth-state.service';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent {
  openSection: string = 'account';

  constructor(
    private router: Router,
    private authService: AuthServiceService,
    private authState: AuthStateService
  ) { }

  toggleSection(section: string): void {
    this.openSection = this.openSection === section ? null : section;
  }

  logout(): void {
    this.authService.logout().subscribe({
      next: () => this.clearAndRedirect(),
      error: () => this.clearAndRedirect()  // clear local state even if the call fails
    });
  }

  private clearAndRedirect(): void {
    this.authState.clear();
    this.router.navigate(['/']);
  }
}
