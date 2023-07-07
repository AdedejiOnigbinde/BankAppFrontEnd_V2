import { Component, OnInit } from '@angular/core';
import { AccountService } from '../services/account/account.service';
import { TransactionService } from '../services/transaction/transaction.service';

@Component({
  selector: 'app-client-dashboard',
  templateUrl: './client-dashboard.component.html',
  styleUrls: ['./client-dashboard.component.css']
})
export class ClientDashboardComponent implements OnInit {
  listOfAccounts: any[] = [];
  recentTransactions: any[] = [];
  sumOfAccountBalances: number = 0;
  errorMessage: string = "";
  firstName: string = ""

  constructor(private accountServe: AccountService, private transactionServe:TransactionService) { }

  ngOnInit(): void {
    this.getAccountList();
    this.getRecentTransaction();
  }

  getAccountList() {
    this.accountServe.getAllClientsAccounts().subscribe({
      next: (res) => {
        this.listOfAccounts = res;
        this.firstName = res[0].ownerId.firstName;
        this.calculateBalamceSum(this.listOfAccounts)

      },
      error: (err) => {
        this.errorMessage = err.message
      }
    })
  }

  calculateBalamceSum(accountsArray: any[]) {
    this.sumOfAccountBalances = accountsArray.reduce((accumulator, account) => accumulator + account.balance, 0);
  }

  getRecentTransaction() {
    this.transactionServe.getAllRecentTransactions().subscribe({
      next: (res) => {
        this.recentTransactions = res;
      },
      error: (err) => {
        this.errorMessage = err.message
      }
    })
  }

}
