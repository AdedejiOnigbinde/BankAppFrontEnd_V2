import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoanService } from '../services/loan/loan.service';
import { loanDto, loanRequest } from '../types';

@Component({
  selector: 'app-get-loan',
  templateUrl: './get-loan.component.html',
  styleUrls: ['./get-loan.component.css']
})
export class GetLoanComponent implements OnInit {
  currentStep = 1;
  step1Submitted = false;
  step2Submitted = false;
  reviewAgreed = false;
  isLoading = false;
  successMessage = '';
  errorMessage = '';
  submittedLoan: loanDto | null = null;

  personalForm: FormGroup;
  loanForm: FormGroup;

  private readonly ANNUAL_RATE = 0.12; // 12% p.a. — matches interestRate sent to API

  get estimatedMonthlyPayment(): number {
    const amount = this.loanForm?.value.loanAmount;
    const months = Number(this.loanForm?.value.loanTerm);
    if (!amount || !months || amount <= 0) return 0;
    const r = this.ANNUAL_RATE / 12;
    return (amount * r * Math.pow(1 + r, months)) / (Math.pow(1 + r, months) - 1);
  }

  get totalRepayment(): number {
    return this.estimatedMonthlyPayment * Number(this.loanForm?.value.loanTerm);
  }

  get totalInterest(): number {
    return this.totalRepayment - (this.loanForm?.value.loanAmount ?? 0);
  }

  constructor(private fb: FormBuilder, private loanService: LoanService) { }

  ngOnInit(): void {
    this.buildForms();
  }

  private buildForms(): void {
    this.personalForm = this.fb.group({
      fullName:         ['',   [Validators.required, Validators.pattern(/^[A-Za-z\s]+$/)]],
      dateOfBirth:      ['',   Validators.required],
      phone:            ['',   [Validators.required, Validators.pattern(/^\d{10,15}$/)]],
      employmentStatus: ['',   Validators.required],
      monthlyIncome:    [null, [Validators.required, Validators.min(1)]]
    });

    this.loanForm = this.fb.group({
      loanAmount:  [null, [Validators.required, Validators.min(1000)]],
      loanPurpose: ['',   Validators.required],
      loanTerm:    ['',   Validators.required],
      // pin is required for UX confirmation but is not included in the API payload
      pin:         [null, [Validators.required, Validators.pattern(/^\d+$/), Validators.min(1000), Validators.max(9999)]]
    });
  }

  nextStep(): void {
    if (this.currentStep === 1) {
      this.step1Submitted = true;
      if (this.personalForm.invalid) return;
    } else if (this.currentStep === 2) {
      this.step2Submitted = true;
      if (this.loanForm.invalid) return;
    }
    if (this.currentStep < 3) this.currentStep++;
  }

  prevStep(): void {
    if (this.currentStep > 1) this.currentStep--;
  }

  resetApplication(): void {
    this.currentStep = 1;
    this.step1Submitted = false;
    this.step2Submitted = false;
    this.reviewAgreed = false;
    this.successMessage = '';
    this.errorMessage = '';
    this.submittedLoan = null;
    this.personalForm.reset();
    this.loanForm.reset();
  }

  submitLoan(): void {
    if (!this.reviewAgreed) {
      this.errorMessage = 'Please confirm your agreement before submitting.';
      return;
    }
    this.errorMessage = '';
    this.isLoading = true;

    const payload: loanRequest = {
      amount:       this.loanForm.value.loanAmount,
      installment:  Math.round(this.estimatedMonthlyPayment * 100) / 100,
      duration:     `${this.loanForm.value.loanTerm} months`,
      interestRate: this.ANNUAL_RATE * 100   // send as percentage: 12
    };

    this.loanService.applyForLoan(payload).subscribe({
      next: (res: loanDto) => {
        this.isLoading = false;
        this.submittedLoan = res;
        this.successMessage = `Your loan application #${res.loanId} has been submitted and is currently ${res.status.replace(/_/g, ' ').toLowerCase()}. We will review it and get back to you within 3–5 business days.`;
      },
      error: (err) => {
        this.isLoading = false;
        this.errorMessage = err.error || 'Failed to submit your application. Please try again.';
      }
    });
  }
}
