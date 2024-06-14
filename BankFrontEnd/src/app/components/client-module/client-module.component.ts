import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { AccountService } from './services/account/account.service';
import { accountDto, clientDto } from './types';
import { ClientService } from './services/client/client.service';

@Component({
  selector: 'app-client-module',
  templateUrl: './client-module.component.html',
  styleUrls: ['./client-module.component.css']
})
export class ClientModuleComponent implements OnInit {
  headerText: string = ''
  isClientRoute: boolean = false;
  headerTextMap: { [key: string]: string } = {
    '/client/newaccount': 'Open Account',
    '/client/transfer': 'Transfer',
    '/client/deposit': 'Deposit',
    '/client/getloan': 'Get Loan'
  };
  listOfAccounts: accountDto[];
  checkingAccountNum: number;
  savingsAccountNum: number;
  errorMessage: string = "";
  constructor(private router: Router, private accountServe: AccountService, private clientServe: ClientService) { }

  ngOnInit(): void {
    this.setHeaderText();
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.setHeaderText();
      }
    });
  }

  private setHeaderText(): void {
    const currentRoute = this.router.url;
    this.headerText = this.headerTextMap[currentRoute];
    this.isClientRoute = currentRoute === '/client';
    if (this.isClientRoute) {
      this.getAccountList();
      this.getClientName();
    }
  }

  getAccountList() {
    this.accountServe.getAllClientsAccounts().subscribe({
      next: (res: accountDto[]) => {
        this.listOfAccounts = res;
        this.getAccountNumbers(this.listOfAccounts)
      },
      error: (err) => {
        this.errorMessage = err.message
      }
    })
  }

  getAccountNumbers(accountsArray: accountDto[]) {
    accountsArray.forEach(account => {
      if (account.accountType === "savings") {
        this.savingsAccountNum = account.accountNumber
      } else {
        this.checkingAccountNum = account.accountNumber
      }
    })
  }

  getClientName() {
    this.clientServe.getProfileData().subscribe({
      next: (res: clientDto) => {
        this.headerText = `Welcome ${res.firstName}`;
      },
      error: (err) => {
        this.errorMessage = err.message
      }
    })
  }

}
