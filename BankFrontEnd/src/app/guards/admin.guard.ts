import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthStateService } from '../services/auth-state/auth-state.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(private router: Router, private authState: AuthStateService) { }

  canActivate(): boolean {
    if (this.authState.getRole() === 'ADMIN') {
      return true;
    }
    this.router.navigate(['/login']);
    return false;
  }
}
