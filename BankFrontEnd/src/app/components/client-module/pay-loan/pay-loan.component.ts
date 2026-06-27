import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoanService } from '../services/loan/loan.service';
import { loanDto } from '../types';

@Component({
  selector: 'app-pay-loan',
  templateUrl: './pay-loan.component.html',
  styleUrls: ['./pay-loan.component.css']
})
export class PayLoanComponent implements OnInit {
  loans: loanDto[] = [];
  loanSum = 0;
  selectedLoan: loanDto | null = null;
  paymentForm: FormGroup;

  isLoadingList = false;
  isPaymentLoading = false;
  listError = '';
  paymentError = '';
  paymentSuccess = '';

  constructor(private loanService: LoanService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.buildPaymentForm();
    this.loadLoans();
  }

  private buildPaymentForm(): void {
    this.paymentForm = this.fb.group({
      paymentAmount: [null, [Validators.required, Validators.min(1)]]
    });
  }

  loadLoans(): void {
    this.isLoadingList = true;
    this.listError = '';

    this.loanService.getAllLoans().subscribe({
      next: (loans) => {
        this.loans = loans;
        this.isLoadingList = false;
      },
      error: (err) => {
        this.listError = err.error || 'Failed to load loans.';
        this.isLoadingList = false;
      }
    });

    this.loanService.getLoanSum().subscribe({
      next: (sum) => { this.loanSum = sum; },
      error: () => { }  // non-critical, don't surface a second error
    });
  }

  selectLoan(loan: loanDto): void {
    if (loan.status !== 'approved') return;
    this.selectedLoan = loan;
    this.paymentError = '';
    this.paymentSuccess = '';
    this.paymentForm.reset({ paymentAmount: loan.installment });
  }

  goBack(): void {
    this.selectedLoan = null;
    this.paymentError = '';
    this.paymentSuccess = '';
    this.paymentForm.reset();
  }

  get approvedCount(): number {
    return this.loans.filter(l => l.status === 'approved').length;
  }

  get inReviewCount(): number {
    return this.loans.filter(l => l.status === 'in review').length;
  }

  get remainingBalance(): number {
    if (!this.selectedLoan) return 0;
    return this.selectedLoan.amount - this.selectedLoan.paidAmount;
  }

  get paidPercentage(): number {
    if (!this.selectedLoan || this.selectedLoan.amount === 0) return 0;
    return Math.min((this.selectedLoan.paidAmount / this.selectedLoan.amount) * 100, 100);
  }

  submitPayment(): void {
    this.paymentError = '';
    this.paymentSuccess = '';

    if (this.paymentForm.invalid || !this.selectedLoan) return;

    const amount: number = this.paymentForm.value.paymentAmount;
    const maxPayable = this.remainingBalance;

    if (amount > maxPayable) {
      this.paymentError = `Payment of ${amount} exceeds the remaining balance of ${maxPayable}. Please enter a lower amount.`;
      return;
    }

    this.isPaymentLoading = true;

    this.loanService.payLoan(this.selectedLoan.loanId, amount).subscribe({
      next: (res: string) => {
        this.isPaymentLoading = false;
        this.paymentSuccess = res || 'Payment successful!';
        // Refresh the loan data to show updated paidAmount
        this.loanService.getLoan(this.selectedLoan.loanId).subscribe({
          next: (updated) => {
            this.selectedLoan = updated;
            // Update the loan in the list too
            const idx = this.loans.findIndex(l => l.loanId === updated.loanId);
            if (idx !== -1) this.loans[idx] = updated;
          }
        });
        this.loanService.getLoanSum().subscribe({
          next: (sum) => { this.loanSum = sum; }
        });
        this.paymentForm.reset({ paymentAmount: this.selectedLoan.installment });
      },
      error: (err) => {
        this.isPaymentLoading = false;
        this.paymentError = err.error || 'Payment failed. Please try again.';
      }
    });
  }

  statusClass(status: string): string {
    switch (status) {
      case 'approved':   return 'bg-successLight text-successDarker';
      case 'rejected':   return 'bg-errorLight text-errorDarker';
      case 'in review':  return 'bg-warningLight text-warningDarker';
      default:           return 'bg-gray-100 text-gray-500';
    }
  }

  statusLabel(status: string): string {
    return status.charAt(0).toUpperCase() + status.slice(1);
  }
}
