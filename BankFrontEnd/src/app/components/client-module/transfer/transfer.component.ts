import { Component, OnInit } from '@angular/core';
import { TabItem, Tabs } from 'flowbite';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountService } from '../services/account/account.service';
import { accountDto, beneficiaryDto, transactionDto, transferRequestDto } from '../types';
import { ClientService } from '../services/client/client.service';
import { TransactionService } from '../services/transaction/transaction.service';
@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.css']
})
export class TransferComponent implements OnInit {
  transferTransactions: any[] = [];
  tabsElement!: HTMLElement | null;
  tabElements: TabItem[] = [];
  tabs!: Tabs;
  isSubmitted: boolean = false;
  checkingAccount: accountDto;
  transferLimitUpperBound: number = 0;
  transferLimitPercentage: number = 0;
  beneficiaryList: beneficiaryDto[];
  errorMessage: string = "";
  domesticTransferForm: FormGroup;
  internationalTranferFrom: FormGroup;
  interBankTranferForm: FormGroup;
  constructor(private formBuilder: FormBuilder, private accountServe: AccountService, private clientServe: ClientService, private transactionServe: TransactionService) { }

  ngOnInit(): void {
    this.initializeTabs();
    this.getAccountList();
    this.getBeneficiaries();
    this.domesticTransferForm = this.formBuilder.group({
      recipientAccount: [0, [Validators.required, Validators.pattern(/^\d+$/), Validators.max(999999999999), Validators.min(100000000000)]],
      recipientBank: ['', [Validators.required, Validators.pattern(/^[A-Za-z]+$/)]],
      amount: [0, [Validators.required, Validators.pattern(/^\d+$/), Validators.min(1)]],
      pin: [0, [Validators.required, Validators.pattern(/^\d+$/), Validators.max(9999), Validators.min(1000)]],
      saveBeneficiary: [false]
    })
  }

  getAccountList() {
    this.accountServe.getAllClientsAccounts().subscribe({
      next: (res: accountDto[]) => {
        this.getCheckingAccount(res)
      },
      error: (err) => {
        this.errorMessage = err.message
      }
    })
  }

  getBeneficiaries() {
    this.clientServe.getAllClientBeneficiares().subscribe({
      next: (res: beneficiaryDto[]) => {
        this.beneficiaryList = res;
      },
      error: (err) => {
        this.errorMessage = err.message
      }
    })
  }

  getCheckingAccount(accountsArray: accountDto[]) {
    accountsArray.forEach(account => {
      if (account.accountType === "checkings") {
        this.checkingAccount = account;
        this.transferLimitUpperBound = this.checkingAccount.dailyTransferLimit - this.checkingAccount.calcLimit;
        this.transferLimitPercentage = (this.checkingAccount.calcLimit / this.checkingAccount.dailyTransferLimit) * 100;
      } else {
        this.checkingAccount = null;
      }
    })
  }

  submitDomesticTransfer() {
    this.errorMessage = '';
    this.isSubmitted = true;
    if (this.domesticTransferForm.valid) {
      const transactionRequest: transferRequestDto = {
        toAcct: this.domesticTransferForm.controls['recipientAccount'].value,
        fromacct: this.checkingAccount.accountNumber,
        bank: this.domesticTransferForm.controls['recipientBank'].value,
        amount: this.domesticTransferForm.controls['amount'].value,
        pin: this.domesticTransferForm.controls['pin'].value,
        addBeneficary: this.domesticTransferForm.controls['saveBeneficiary'].value
      }
      this.transactionServe.submitTransferRequest(transactionRequest).subscribe({
        next: (res: string) => {
          this.getAccountList();
          this.getBeneficiaries();
          this.domesticTransferForm.reset()
          this.isSubmitted = false;
        },
        error: (err) => {
          this.errorMessage = err.message;
          this.isSubmitted = false;
        }
      })
    }
  }



  options = {
    defaultTabId: 'domestic',
    activeClasses:
      'text-primaryGreen border-primaryGreen font-bold',
  };

  initializeTabs(): void {
    this.tabsElement = document.getElementById('default-tab');
    this.tabElements = [
      {
        id: 'domestic',
        triggerEl: document.querySelector('#domesticTransfer-tab') as HTMLElement,
        targetEl: document.querySelector('#domesticTransfer') as HTMLElement,
      },
      {
        id: 'international',
        triggerEl: document.querySelector('#internationalTransfer-tab') as HTMLElement,
        targetEl: document.querySelector('#internationalTransfer') as HTMLElement,
      },
      {
        id: 'interbank',
        triggerEl: document.querySelector('#interbankTransfer-tab') as HTMLElement,
        targetEl: document.querySelector('#interbankTransfer') as HTMLElement,
      },
    ];
    this.tabs = new Tabs(this.tabsElement, this.tabElements, this.options);
  }

}
