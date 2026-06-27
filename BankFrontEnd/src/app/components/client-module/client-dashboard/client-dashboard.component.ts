import { Component, OnInit } from '@angular/core';
import { AccountService } from '../services/account/account.service';
import { TransactionService } from '../services/transaction/transaction.service';
import { accountDto, transactionDto } from '../types';
import { ClientService } from '../services/client/client.service';

@Component({
  selector: 'app-client-dashboard',
  templateUrl: './client-dashboard.component.html',
  styleUrls: ['./client-dashboard.component.css']
})
export class ClientDashboardComponent implements OnInit {
  listOfAccounts: accountDto[];
  recentTransactions: transactionDto[] = [];
  loansBalanceSum: number = 0;
  savingsBalances: number = 0;
  checkingsBalances: number = 0;
  errorMessage: string = '';
  activeTab: string = 'income';

  constructor(
    private accountServe: AccountService,
    private transactionServe: TransactionService,
    private clientServe: ClientService
  ) { }

  ngOnInit(): void {
    this.getAccountList();
    this.getRecentTransaction();
    this.getTotalLoanSum();
  }

  getAccountList() {
    this.accountServe.getAllClientsAccounts().subscribe({
      next: (res: accountDto[]) => {
        this.listOfAccounts = res;
        this.getAccountBalances(this.listOfAccounts);
      },
      error: (err) => { this.errorMessage = err.message; }
    });
  }

  getAccountBalances(accountsArray: accountDto[]) {
    accountsArray.forEach(account => {
      if (account.accountType === 'savings') {
        this.savingsBalances = account.balance;
      } else if (account.accountType === 'checkings') {
        this.checkingsBalances = account.balance;
      }
    });
  }

  getRecentTransaction() {
    this.transactionServe.getAllRecentTransactions().subscribe({
      next: (res: transactionDto[]) => { this.recentTransactions = res; },
      error: (err) => { this.errorMessage = err.message; }
    });
  }

  getTotalLoanSum() {
    this.clientServe.getTotalLoanSum().subscribe({
      next: (res: number) => { this.loansBalanceSum = res; },
      error: (err) => { this.errorMessage = err.message; }
    });
  }

  isExpense(transactionType: string): boolean {
    return transactionType === 'withdrawal' || transactionType === 'transfer';
  }

  get incomeTransactions(): transactionDto[] {
    return this.recentTransactions.filter(t => !this.isExpense(t.transType));
  }

  get expenseTransactions(): transactionDto[] {
    return this.recentTransactions.filter(t => this.isExpense(t.transType));
  }

  get totalIncome(): number {
    return this.incomeTransactions.reduce((sum, t) => sum + t.transAmount, 0);
  }

  get totalExpenses(): number {
    return this.expenseTransactions.reduce((sum, t) => sum + t.transAmount, 0);
  }

  get incomePercentage(): number {
    const total = this.totalIncome + this.totalExpenses;
    return total > 0 ? Math.round((this.totalIncome / total) * 100) : 0;
  }

  get expensePercentage(): number {
    const total = this.totalIncome + this.totalExpenses;
    return total > 0 ? 100 - this.incomePercentage : 0;
  }
}
