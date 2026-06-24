import { Component, OnInit } from '@angular/core';
import { accountDto, depositRequestDto } from '../types';
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
  transferLimitUpperBound: number = 0;
  transferLimitPercentage: number = 0;
  checkingAccount: accountDto;
  accountList: accountDto[];
  errorMessage: string = '';
  successMessage: string = '';
  depositRequestForm: FormGroup;
  depositRequestFormSubmitted: boolean;
  constructor(private formBuilder: FormBuilder, private depositServe: DepositService, private accountServe: AccountService) { }

  ngOnInit(): void {
    this.getAllDepositRequest();
    this.getAccountList();
    this.depositRequestForm = this.formBuilder.group({
      checkNumber: ['', [Validators.required, Validators.minLength(21), Validators.maxLength(25), Validators.pattern(/^[0-9]+$/)]],
      checkBank: ['', [Validators.required, Validators.pattern(/^[A-Za-z\s]+$/)]],
      checkAmount: [0, [Validators.required, Validators.min(1)]],
      description: ['', [Validators.pattern(/^[A-Za-z\s]+$/)]],
      splitCheckingAmount: [0, [Validators.min(0)]],
      splitSavingsAmount: [0, [Validators.min(0)]]
    })
  }

  getAllDepositRequest() {
    this.depositServe.getAllClientDepositRequest().subscribe({
      next: (res: depositRequestDto[]) => {
        this.depositTransactions = res;
      },
      error: (err) => {
        this.errorMessage = err.error
      }
    })

  }

  createDepositRequest() {
    this.errorMessage = '';
    this.successMessage = '';
    this.depositRequestFormSubmitted = true;
    if (this.depositRequestForm.valid) {
      this.depositServe.createDepositRequest(this.depositRequestForm.value).subscribe({
        next: (res: string) => {
          this.successMessage = res;
          this.depositRequestFormSubmitted = false;
          this.getAllDepositRequest();
        },
        error: (err) => {
          this.errorMessage = err.error;
          this.depositRequestFormSubmitted = false;
        }
      })

    }
  }

  getAccountList() {
    this.accountServe.getAllClientsAccounts().subscribe({
      next: (res: accountDto[]) => {
        this.accountList = res;
        this.getCheckingAccount(res)
      },
      error: (err) => {
        this.errorMessage = err.message
      }
    })
  }

  getCheckingAccount(accountsArray: accountDto[]) {
    const checking = accountsArray.find(a => a.accountType === 'checkings');
    this.checkingAccount = checking ?? null;
    if (checking) {
      this.transferLimitUpperBound = checking.dailyTransferLimit - checking.calcLimit;
      this.transferLimitPercentage = (checking.calcLimit / checking.dailyTransferLimit) * 100;
    }
  }

}
