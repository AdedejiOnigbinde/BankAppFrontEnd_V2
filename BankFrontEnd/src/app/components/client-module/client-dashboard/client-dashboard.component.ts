import { Component, OnInit } from '@angular/core';
import { AccountService } from '../services/account/account.service';

@Component({
  selector: 'app-client-dashboard',
  templateUrl: './client-dashboard.component.html',
  styleUrls: ['./client-dashboard.component.css']
})
export class ClientDashboardComponent implements OnInit {
  listOfAccounts: any[] = [];
  sumOfAccountBalances: number = 0;
  errorMessage: string = "";

  constructor(private accountServe: AccountService) { }

  ngOnInit(): void {
    this.getAccountList();
  }

  getAccountList() {
    this.accountServe.getAllClientsAccounts().subscribe({
      next: (res) => {
        this.listOfAccounts = res;
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

}
