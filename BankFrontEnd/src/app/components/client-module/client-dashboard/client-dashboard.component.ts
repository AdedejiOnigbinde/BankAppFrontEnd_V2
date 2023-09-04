import { Component, OnInit } from '@angular/core';
import { AccountService } from '../services/account/account.service';
import { TransactionService } from '../services/transaction/transaction.service';
import { ChartConfiguration, ChartData } from 'chart.js';

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
  IncomeBarChartLegend = false;
  ExpensesBarChartLegend = false;

  constructor(private accountServe: AccountService, private transactionServe: TransactionService) { }

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

  IncomeBarChart: ChartConfiguration<'bar'>['data'] = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [{
      data: [5, 5, 8, 8.5, 5, 5, 4, 8, 7, 6, 5, 4],
      backgroundColor: 'rgb(230, 231, 230)',
      hoverBackgroundColor: 'rgb(29, 113, 29)',
    }]
  };

  IncomeBarChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: true,
  };

  ExpensesBarChart: ChartConfiguration<'bar'>['data'] = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [{
      data: [5, 5, 8, 8.5, 5, 5, 4, 8, 7, 6, 5, 4],
      backgroundColor: 'rgb(230, 231, 230)',
      hoverBackgroundColor: 'rgb(29, 113, 29)',
    }]
  };

  ExpensesBarChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: true,
  };


  doughnutChartData: ChartData<'doughnut'> = {
    datasets: [
      {
        data: [82, 18],
        backgroundColor: ['rgb(29, 113, 29)', 'rgb(186, 215, 186)'],
        hoverBackgroundColor: ['rgb(29, 113, 29)', 'rgb(186, 215, 186)'],
        hoverBorderColor: ['rgb(29, 113, 29)', 'rgb(186, 215, 186)'],
      },
    ],
  };

  doughnutChartOption: ChartConfiguration<'doughnut'>['options'] = {
    responsive: true,
  };

}
