import { Component, OnInit } from '@angular/core';
import { accountDto, depositRequestDto, depositRequestPayload } from '../types';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DepositService } from '../services/deposit/deposit.service';
import { AccountService } from '../services/account/account.service';

@Component({
  selector: 'app-deposit',
  templateUrl: './deposit.component.html',
  styleUrls: ['./deposit.component.css']
})
export class DepositComponent implements OnInit {
  depositTransactions: depositRequestDto[] = [];
  transferLimitUpperBound = 0;
  transferLimitPercentage = 0;
  checkingAccount: accountDto | null = null;

  // Separate messages so list errors don't overwrite form feedback
  listErrorMessage = '';
  errorMessage = '';
  successMessage = '';

  isLoading = false;
  depositRequestFormSubmitted = false;
  depositRequestForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private depositServe: DepositService,
    private accountServe: AccountService
  ) { }

  ngOnInit(): void {
    this.buildForm();
    this.loadDepositHistory();
    this.getAccountList();
  }

  private buildForm(): void {
    this.depositRequestForm = this.formBuilder.group({
      checkNumber:         ['',   [Validators.required, Validators.minLength(21), Validators.maxLength(25), Validators.pattern(/^[0-9]+$/)]],
      checkBank:           ['',   [Validators.required, Validators.pattern(/^[A-Za-z\s]+$/)]],
      checkAmount:         [null, [Validators.required, Validators.min(1)]],
      description:         ['',   [Validators.pattern(/^[A-Za-z\s]+$/)]],
      splitCheckingAmount: [null, [Validators.min(0)]],
      splitSavingsAmount:  [null, [Validators.min(0)]]
    });
  }

  loadDepositHistory(): void {
    this.depositServe.getAllClientDepositRequest().subscribe({
      next: (res: depositRequestDto[]) => { this.depositTransactions = res; },
      error: (err) => { this.listErrorMessage = err.error; }
    });
  }

  createDepositRequest(): void {
    this.errorMessage = '';
    this.successMessage = '';
    this.depositRequestFormSubmitted = true;

    if (!this.depositRequestForm.valid) return;

    this.isLoading = true;
    const payload = this.buildPayload();

    this.depositServe.createDepositRequest(payload).subscribe({
      next: (res: string) => {
        this.isLoading = false;
        this.depositRequestFormSubmitted = false;
        this.successMessage = res || 'Deposit request submitted successfully.';
        this.depositRequestForm.reset({
          checkNumber: '', checkBank: '', checkAmount: null,
          description: '', splitCheckingAmount: null, splitSavingsAmount: null
        });
        this.loadDepositHistory();
      },
      error: (err) => {
        this.isLoading = false;
        this.depositRequestFormSubmitted = false;
        this.errorMessage = err.error || 'Failed to submit deposit. Please try again.';
      }
    });
  }

  private buildPayload(): depositRequestPayload {
    const { checkNumber, checkBank, checkAmount, description, splitCheckingAmount, splitSavingsAmount } = this.depositRequestForm.value;
    const payload: depositRequestPayload = {
      checkNumber: Number(checkNumber),
      checkBank,
      checkAmount
    };

    if (description)         payload.description         = description;
    if (splitCheckingAmount) payload.splitCheckingAmount = splitCheckingAmount;
    if (splitSavingsAmount)  payload.splitSavingsAmount  = splitSavingsAmount;

    return payload;
  }

  private getAccountList(): void {
    this.accountServe.getAllClientsAccounts().subscribe({
      next: (res: accountDto[]) => { this.updateCheckingLimit(res); },
      error: (err) => { this.listErrorMessage = err.message; }
    });
  }

  private updateCheckingLimit(accounts: accountDto[]): void {
    const checking = accounts.find(a => a.accountType === 'checkings') ?? null;
    this.checkingAccount = checking;
    if (checking) {
      this.transferLimitUpperBound = checking.dailyTransferLimit - checking.calcLimit;
      this.transferLimitPercentage = (checking.calcLimit / checking.dailyTransferLimit) * 100;
    }
  }
}
