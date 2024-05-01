import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-client-module',
  templateUrl: './client-module.component.html',
  styleUrls: ['./client-module.component.css']
})
export class ClientModuleComponent implements OnInit {
  headerText: string = ''
  isClientRoute: boolean = false;
  headerTextMap: { [key: string]: string } = {
    '/client': 'Welcome Adedeji!',
    '/client/newaccount': 'Open Account',
    '/client/transfer':'Transfer',
    '/client/deposit':'Deposit',
    '/client/getloan':'Get Loan'
  };
  checkingAccountNum: string = 'Checkings - 0427541108'
  savingsAccountNum: string = 'Savings - 0427541108'
  constructor(private router: Router) { }

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
  }

}
