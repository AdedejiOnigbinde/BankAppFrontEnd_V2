import { Component, OnInit } from '@angular/core';
import { AdminService } from '../services/admin.service';
import { accountDto, pageDto } from '../admin-types';

@Component({
  selector: 'app-admin-accounts',
  templateUrl: './admin-accounts.component.html',
  styleUrls: ['./admin-accounts.component.css']
})
export class AdminAccountsComponent implements OnInit {
  page: pageDto<accountDto> | null = null;
  currentPage = 0;
  isLoading = false;
  error = '';

  constructor(private adminService: AdminService) { }

  ngOnInit(): void { this.loadPage(0); }

  loadPage(page: number): void {
    this.isLoading = true;
    this.error = '';
    this.adminService.getAllAccounts(page).subscribe({
      next: (res) => { this.page = res; this.currentPage = page; this.isLoading = false; },
      error: () => { this.error = 'Failed to load accounts.'; this.isLoading = false; }
    });
  }

  statusClass(status: string): string {
    switch (status?.toUpperCase()) {
      case 'ACTIVE':   return 'bg-successLight text-successDarker';
      case 'INACTIVE': return 'bg-gray-100 text-gray-500';
      case 'FROZEN':   return 'bg-errorLight text-errorDarker';
      default:         return 'bg-gray-100 text-gray-500';
    }
  }
}
