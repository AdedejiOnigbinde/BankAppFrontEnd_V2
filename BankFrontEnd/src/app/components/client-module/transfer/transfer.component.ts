import { Component, OnInit } from '@angular/core';
import { TabItem, Tabs } from 'flowbite';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  domesticTransferForm: FormGroup;
  internationalTranferFrom: FormGroup;
  interBankTranferForm: FormGroup;
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.initializeTabs();
    // this.domesticTransferForm = this.formBuilder.group({
    //   userName: ['', Validators.required],
    //   password: ['', Validators.required]
    // })
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
