import { Component, OnInit } from '@angular/core';
import { AdminService } from '../services/admin.service';
import { depositRequestDto } from '../admin-types';

@Component({
  selector: 'app-admin-deposits',
  templateUrl: './admin-deposits.component.html',
  styleUrls: ['./admin-deposits.component.css']
})
export class AdminDepositsComponent implements OnInit {
  deposits: depositRequestDto[] = [];
  isLoading = false;
  error = '';
  processingId: number | null = null;
  feedbackMap: Record<number, { type: 'success' | 'error'; message: string }> = {};

  constructor(private adminService: AdminService) { }

  ngOnInit(): void { this.loadDeposits(); }

  loadDeposits(): void {
    this.isLoading = true;
    this.error = '';
    this.adminService.getAllDepositRequests().subscribe({
      next: (res) => {
        this.deposits = res.filter(d => d.status === 'in review');
        this.isLoading = false;
      },
      error: () => { this.error = 'Failed to load deposit requests.'; this.isLoading = false; }
    });
  }

  decide(deposit: depositRequestDto, decision: 'approved' | 'rejected'): void {
    this.processingId = deposit.depositRequestId;
    this.feedbackMap[deposit.depositRequestId] = null;

    this.adminService.processDeposit(deposit.depositRequestId, decision).subscribe({
      next: (res: string) => {
        this.processingId = null;
        this.feedbackMap[deposit.depositRequestId] = { type: 'success', message: res || `Deposit ${decision.toLowerCase()}.` };
        this.deposits = this.deposits.filter(d => d.depositRequestId !== deposit.depositRequestId);
      },
      error: (err) => {
        this.processingId = null;
        this.feedbackMap[deposit.depositRequestId] = { type: 'error', message: err.error || 'Action failed.' };
      }
    });
  }

  hasSplit(deposit: depositRequestDto): boolean {
    return deposit.splitCheckingAmount > 0 || deposit.splitSavingsAmount > 0;
  }
}
