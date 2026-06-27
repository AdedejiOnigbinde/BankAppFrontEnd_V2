import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthStateService {
  private readonly ROLE_KEY = 'userRole';

  setRole(role: string): void {
    sessionStorage.setItem(this.ROLE_KEY, role);
  }

  getRole(): string | null {
    return sessionStorage.getItem(this.ROLE_KEY);
  }

  clear(): void {
    sessionStorage.removeItem(this.ROLE_KEY);
  }

  get isAuthenticated(): boolean {
    return !!this.getRole();
  }
}
