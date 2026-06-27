import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { removeCookie } from 'typescript-cookie';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent {
  openSection: string = 'account';

  constructor(private route: Router) { }

  toggleSection(section: string): void {
    this.openSection = this.openSection === section ? null : section;
  }

  logout(): void {
    removeCookie('userToken');
    this.route.navigate(['/']);
  }
}
