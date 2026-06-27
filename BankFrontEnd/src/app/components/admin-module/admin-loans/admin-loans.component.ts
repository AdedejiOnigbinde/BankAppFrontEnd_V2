import { Component, OnInit } from '@angular/core';
import { AdminService } from '../services/admin.service';
import { adminLoanRequestDto } from '../admin-types';

@Component({
  selector: 'app-admin-loans',
  templateUrl: './admin-loans.component.html',
  styleUrls: ['./admin-loans.component.css']
})
export class AdminLoansComponent implements OnInit {
  loans: adminLoanRequestDto[] = [];
  isLoading = false;
  error = '';
  processingId: number | null = null;
  feedbackMap: Record<number, { type: 'success' | 'error'; message: string }> = {};

  constructor(private adminService: AdminService) { }

  ngOnInit(): void { this.loadLoans(); }

  loadLoans(): void {
    this.isLoading = true;
    this.error = '';
    this.adminService.getPendingLoanRequests().subscribe({
      next: (res) => { this.loans = res; this.isLoading = false; },
      error: () => { this.error = 'Failed to load loan requests.'; this.isLoading = false; }
    });
  }

  decide(loan: adminLoanRequestDto, decision: 'approved' | 'rejected'): void {
    this.processingId = loan.loanRequestId;
    this.feedbackMap[loan.loanRequestId] = null;

    this.adminService.updateLoanStatus(loan.loanRequestId, decision).subscribe({
      next: (res: string) => {
        this.processingId = null;
        this.feedbackMap[loan.loanRequestId] = { type: 'success', message: res || `Loan ${decision.toLowerCase()}.` };
        this.loans = this.loans.filter(l => l.loanRequestId !== loan.loanRequestId);
      },
      error: (err) => {
        this.processingId = null;
        this.feedbackMap[loan.loanRequestId] = { type: 'error', message: err.error || 'Action failed.' };
      }
    });
  }
}
