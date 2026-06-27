import { Component, OnInit } from '@angular/core';
import { AdminService } from '../services/admin.service';
import { clientDto, pageDto } from '../admin-types';

@Component({
  selector: 'app-admin-clients',
  templateUrl: './admin-clients.component.html',
  styleUrls: ['./admin-clients.component.css']
})
export class AdminClientsComponent implements OnInit {
  page: pageDto<clientDto> | null = null;
  currentPage = 0;
  isLoading = false;
  error = '';

  constructor(private adminService: AdminService) { }

  ngOnInit(): void { this.loadPage(0); }

  loadPage(page: number): void {
    this.isLoading = true;
    this.error = '';
    this.adminService.getAllClients(page).subscribe({
      next: (res) => { this.page = res; this.currentPage = page; this.isLoading = false; },
      error: () => { this.error = 'Failed to load clients.'; this.isLoading = false; }
    });
  }

  displayName(c: clientDto): string {
    const cap = (s: string) => s ? s.charAt(0).toUpperCase() + s.slice(1) : '';
    return `${cap(c.firstName)} ${cap(c.lastName)}`;
  }
}
