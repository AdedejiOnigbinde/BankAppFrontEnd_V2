import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AccountService } from '../services/account/account.service';
import { accountDto, beneficiaryDto, transferRequestDto } from '../types';
import { ClientService } from '../services/client/client.service';
import { TransactionService } from '../services/transaction/transaction.service';

@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.css']
})
export class TransferComponent implements OnInit, OnDestroy {
  activeTab = 'domestic';

  // Submission flags
  isDomesticFormSubmitted = false;
  isInternationalFormSubmitted = false;
  isInterbankTransferFormSubmitted = false;

  // Loading flags — prevent double-submission
  isDomesticLoading = false;
  isInternationalLoading = false;
  isInterbankLoading = false;

  // Account data
  checkingAccount: accountDto | null = null;
  transferLimitUpperBound = 0;
  transferLimitPercentage = 0;
  beneficiaryList: beneficiaryDto[] = [];
  accountList: accountDto[] = [];

  // Messages
  errorMessage = '';
  dTerrorMessage = '';
  iTerrorMessage = '';
  iBerrorMessage = '';
  dTsuccessMessage = '';
  iTsuccessMessage = '';
  iBsuccessMessage = '';

  // Forms
  domesticTransferForm: FormGroup;
  internationalTransferForm: FormGroup;
  interBankTransferForm: FormGroup;

  private rateSubscription: Subscription;

  constructor(
    private formBuilder: FormBuilder,
    private accountServe: AccountService,
    private clientServe: ClientService,
    private transactionServe: TransactionService
  ) { }

  ngOnInit(): void {
    this.getAccountList();
    this.getBeneficiaries();
    this.buildForms();
  }

  ngOnDestroy(): void {
    this.rateSubscription?.unsubscribe();
  }

  private buildForms(): void {
    this.domesticTransferForm = this.formBuilder.group({
      recipientAccount: [null, [Validators.required, Validators.pattern(/^\d+$/), Validators.min(100000000000), Validators.max(999999999999)]],
      recipientBank:    ['',   [Validators.required, Validators.pattern(/^[A-Za-z]+$/)]],
      amount:           [null, [Validators.required, Validators.pattern(/^\d+$/), Validators.min(1)]],
      pin:              [null, [Validators.required, Validators.pattern(/^\d+$/), Validators.min(1000), Validators.max(9999)]],
      saveBeneficiary:  [false]
    });

    this.internationalTransferForm = this.formBuilder.group({
      interRecipientAccount: [null, [Validators.required, Validators.pattern(/^\d+$/), Validators.min(100000000000), Validators.max(999999999999)]],
      interRecipientBank:    ['',   [Validators.required, Validators.pattern(/^[A-Za-z]+$/)]],
      interAmount:           [null, [Validators.required, Validators.pattern(/^\d+$/), Validators.min(1)]],
      interPin:              [null, [Validators.required, Validators.pattern(/^\d+$/), Validators.min(1000), Validators.max(9999)]],
      interSaveBeneficiary:  [false],
      rate:                  ['']
    });

    this.interBankTransferForm = this.formBuilder.group({
      recipientAccount: ['', Validators.required],
      senderAccount:    ['', Validators.required],
      amount:           [null, [Validators.required, Validators.pattern(/^\d+$/), Validators.min(1)]],
      pin:              [null, [Validators.required, Validators.pattern(/^\d+$/), Validators.min(1000), Validators.max(9999)]]
    });

    this.rateSubscription = this.internationalTransferForm.controls['interAmount'].valueChanges
      .subscribe((amount: number) => {
        this.internationalTransferForm.patchValue(
          { rate: this.formatCurrency(amount / 1000) },
          { emitEvent: false }
        );
      });
  }

  // ── Data fetching ──────────────────────────────────────────

  getAccountList(): void {
    this.accountServe.getAllClientsAccounts().subscribe({
      next: (res: accountDto[]) => {
        this.accountList = res;
        this.getCheckingAccount(res);
      },
      error: (err) => { this.errorMessage = err.message; }
    });
  }

  getBeneficiaries(): void {
    this.clientServe.getAllClientBeneficiares().subscribe({
      next: (res: beneficiaryDto[]) => { this.beneficiaryList = res; },
      error: (err) => { this.errorMessage = err.message; }
    });
  }

  private getCheckingAccount(accounts: accountDto[]): void {
    const checking = accounts.find(a => a.accountType === 'checkings') ?? null;
    this.checkingAccount = checking;
    if (checking) {
      this.transferLimitUpperBound = checking.dailyTransferLimit - checking.calcLimit;
      this.transferLimitPercentage = (checking.calcLimit / checking.dailyTransferLimit) * 100;
    }
  }

  // ── Submit handlers ────────────────────────────────────────

  submitDomesticTransfer(): void {
    this.dTerrorMessage = '';
    this.dTsuccessMessage = '';
    this.isDomesticFormSubmitted = true;

    if (!this.checkingAccount) {
      this.dTerrorMessage = 'No checking account found. Please open one first.';
      return;
    }

    if (!this.domesticTransferForm.valid) return;

    this.isDomesticLoading = true;
    const req: transferRequestDto = {
      toAcct:        this.domesticTransferForm.value.recipientAccount,
      fromacct:      this.checkingAccount.accountNumber,
      bank:          this.domesticTransferForm.value.recipientBank,
      amount:        this.domesticTransferForm.value.amount,
      pin:           this.domesticTransferForm.value.pin,
      addBeneficary: this.domesticTransferForm.value.saveBeneficiary
    };

    this.transactionServe.submitTransferRequest(req).subscribe({
      next: (res: string) => {
        this.isDomesticLoading = false;
        this.isDomesticFormSubmitted = false;
        this.dTsuccessMessage = res || 'Transfer submitted successfully.';
        this.domesticTransferForm.reset({ saveBeneficiary: false });
        this.getAccountList();
        this.getBeneficiaries();
      },
      error: (err) => {
        this.isDomesticLoading = false;
        this.isDomesticFormSubmitted = false;
        this.dTerrorMessage = err.message || 'Transfer failed. Please try again.';
      }
    });
  }

  submitInternationalTransfer(): void {
    this.iTerrorMessage = '';
    this.iTsuccessMessage = '';
    this.isInternationalFormSubmitted = true;

    if (!this.checkingAccount) {
      this.iTerrorMessage = 'No checking account found. Please open one first.';
      return;
    }

    if (!this.internationalTransferForm.valid) return;

    this.isInternationalLoading = true;
    const req: transferRequestDto = {
      toAcct:        this.internationalTransferForm.value.interRecipientAccount,
      fromacct:      this.checkingAccount.accountNumber,
      bank:          this.internationalTransferForm.value.interRecipientBank,
      amount:        this.internationalTransferForm.value.interAmount,
      pin:           this.internationalTransferForm.value.interPin,
      addBeneficary: this.internationalTransferForm.value.interSaveBeneficiary
    };

    this.transactionServe.submitTransferRequest(req).subscribe({
      next: (res: string) => {
        this.isInternationalLoading = false;
        this.isInternationalFormSubmitted = false;
        this.iTsuccessMessage = res || 'Transfer submitted successfully.';
        this.internationalTransferForm.reset({ interSaveBeneficiary: false, rate: '' });
        this.getAccountList();
        this.getBeneficiaries();
      },
      error: (err) => {
        this.isInternationalLoading = false;
        this.isInternationalFormSubmitted = false;
        this.iTerrorMessage = err.message || 'Transfer failed. Please try again.';
      }
    });
  }

  submitInterbankTransfer(): void {
    this.iBerrorMessage = '';
    this.iBsuccessMessage = '';
    this.isInterbankTransferFormSubmitted = true;

    const { recipientAccount, senderAccount } = this.interBankTransferForm.value;

    if (senderAccount && recipientAccount && senderAccount === recipientAccount) {
      this.iBerrorMessage = 'Cannot transfer to the same account.';
      this.isInterbankTransferFormSubmitted = false;
      return;
    }

    if (!this.interBankTransferForm.valid) return;

    this.isInterbankLoading = true;
    const req: transferRequestDto = {
      toAcct:        recipientAccount,
      fromacct:      senderAccount,
      bank:          '',
      amount:        this.interBankTransferForm.value.amount,
      pin:           this.interBankTransferForm.value.pin,
      addBeneficary: false
    };

    this.transactionServe.submitInnerBankTransferRequest(req).subscribe({
      next: (res: string) => {
        this.isInterbankLoading = false;
        this.isInterbankTransferFormSubmitted = false;
        this.iBsuccessMessage = res || 'Transfer submitted successfully.';
        this.interBankTransferForm.reset();
        this.getAccountList();
        this.getBeneficiaries();
      },
      error: (err) => {
        this.isInterbankLoading = false;
        this.isInterbankTransferFormSubmitted = false;
        this.iBerrorMessage = err.message || 'Transfer failed. Please try again.';
      }
    });
  }

  // ── Beneficiary ────────────────────────────────────────────

  selectBeneficiary(beneficiary: beneficiaryDto): void {
    this.activeTab = 'domestic';
    this.domesticTransferForm.patchValue({
      recipientAccount: beneficiary.bankAccountNumber,
      recipientBank:    beneficiary.bank
    });
  }

  // ── Helpers ────────────────────────────────────────────────

  private formatCurrency(value: number): string {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
  }
}
