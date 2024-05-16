import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { removeCookie } from 'typescript-cookie'
import { Accordion, AccordionItem } from 'flowbite';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit {
  accordian!: Accordion
  accordionItems: AccordionItem[] = [];
  accordionElement: HTMLElement | null;
  constructor(private route: Router) { }

  ngOnInit(): void {
    this.initializeSideNav();
  }

  logout() {
    removeCookie('userToken')
    this.route.navigate(['/'])
  }

  options = {
    alwaysOpen: true
  };

  initializeSideNav(): void {
    this.accordionElement = document.getElementById('sidenav-accordion');

    this.accordionItems = [
      {
        id: 'account-section-heading',
        triggerEl: document.querySelector('#account-section-heading') as HTMLElement,
        targetEl: document.querySelector('#account-section-body') as HTMLElement,
        active: true
      },
      {
        id: 'loan-section-header',
        triggerEl: document.querySelector('#loan-section-header') as HTMLElement,
        targetEl: document.querySelector('#loan-section-body') as HTMLElement,
        active: false
      },
      {
        id: 'bill-section-header',
        triggerEl: document.querySelector('#bill-section-header') as HTMLElement,
        targetEl: document.querySelector('#bill-section-body') as HTMLElement,
        active: false
      },
      {
        id: 'profile-section-header',
        triggerEl: document.querySelector('#profile-section-header') as HTMLElement,
        targetEl: document.querySelector('#profile-section-body') as HTMLElement,
        active: false
      }
    ];
    this.accordian = new Accordion(this.accordionElement, this.accordionItems, this.options);
  }
}
