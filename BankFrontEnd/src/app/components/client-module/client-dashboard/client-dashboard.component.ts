import { Component, OnInit } from '@angular/core';
import { AccountService } from '../services/account/account.service';
import { TransactionService } from '../services/transaction/transaction.service';
import { TabItem, Tabs } from 'flowbite';
import { accountDto, transactionDto } from '../types';
import { ClientService } from '../services/client/client.service';
@Component({
  selector: 'app-client-dashboard',
  templateUrl: './client-dashboard.component.html',
  styleUrls: ['./client-dashboard.component.css']
})
export class ClientDashboardComponent implements OnInit {
  listOfAccounts: accountDto[];
  recentTransactions: transactionDto[];
  loansBalanceSum: number = 0;
  savingsBalances: number = 0;
  checkingsBalances: number = 0;
  errorMessage: string = "";
  tabsElement!: HTMLElement | null;
  tabElements: TabItem[] = [];
  tabs: Tabs;


  constructor(private accountServe: AccountService, private transactionServe: TransactionService, private clientServe: ClientService) { }

  ngOnInit(): void {
    this.getAccountList();
    this.getRecentTransaction();
    this.initializeTabs();
    this.getTotalLoanSum();
  }

  getAccountList() {
    this.accountServe.getAllClientsAccounts().subscribe({
      next: (res: accountDto[]) => {
        this.listOfAccounts = res;
        this.getAccountBalances(this.listOfAccounts)
      },
      error: (err) => {
        this.errorMessage = err.message
      }
    })
  }

  getAccountBalances(accountsArray: any[]) {
    accountsArray.forEach(account => {
      if (account.accountType === "savings") {
        this.savingsBalances = account.balance
      } else {
        this.checkingsBalances = account.balance
      }
    })
  }

  getRecentTransaction() {
    this.transactionServe.getAllRecentTransactions().subscribe({
      next: (res: transactionDto[]) => {
        this.recentTransactions = res;
      },
      error: (err) => {
        this.errorMessage = err.message
      }
    })
  }

  getTotalLoanSum() {
    this.clientServe.getTotalLoanSum().subscribe({
      next: (res: number) => {
        this.loansBalanceSum = res;
      },
      error: (err) => {
        this.errorMessage = err.message
      }
    })
  }

  determineTransactionType(transactionType: String): boolean {
    return transactionType === 'withdrawal' || transactionType === 'transfer';
  }

  options = {
    defaultTabId: 'income',
    activeClasses:
      'text-primaryGreen border-primaryGreen font-bold',
  };

  initializeTabs(): void {
    this.tabsElement = document.getElementById('default-tab');
    this.tabElements = [
      {
        id: 'income',
        triggerEl: document.querySelector('#income-tab') as HTMLElement,
        targetEl: document.querySelector('#income') as HTMLElement,
      },
      {
        id: 'expenses',
        triggerEl: document.querySelector('#expenses-tab') as HTMLElement,
        targetEl: document.querySelector('#expenses') as HTMLElement,
      },
    ];
    this.tabs = new Tabs(this.tabsElement, this.tabElements, this.options);
  }


}
