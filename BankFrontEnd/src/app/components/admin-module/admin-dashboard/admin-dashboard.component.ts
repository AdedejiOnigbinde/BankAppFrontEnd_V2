import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import { AdminService } from '../services/admin.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  totalClients = 0;
  totalAccounts = 0;
  pendingLoans = 0;
  pendingDeposits = 0;
  isLoading = true;

  constructor(private adminService: AdminService) { }

  ngOnInit(): void {
    forkJoin({
      clients:  this.adminService.getAllClients(0),
      accounts: this.adminService.getAllAccounts(0),
      loans:    this.adminService.getPendingLoanRequests(),
      deposits: this.adminService.getAllDepositRequests()
    }).subscribe({
      next: ({ clients, accounts, loans, deposits }) => {
        this.totalClients   = clients.totalElements;
        this.totalAccounts  = accounts.totalElements;
        this.pendingLoans   = loans.length;
        this.pendingDeposits = deposits.filter(d => d.status === 'in review').length;
        this.isLoading = false;
      },
      error: () => { this.isLoading = false; }
    });
  }
}
