import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Accordion, AccordionInterface, AccordionItem } from 'flowbite';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {
  accordionElement: HTMLElement | null;
  accordionElements: AccordionItem[];
  accordion: AccordionInterface;

  constructor() { }

  ngOnInit(): void {
    this.initializeAccordion();
  }
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    autoplay: true,
    dots: false,
    navSpeed: 700,
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 2
      },
      940: {
        items: 2
      }
    },
    nav: false
  }

  initializeAccordion(): void {
    this.accordionElement = document.querySelector('#accordion-collapse');
    this.accordionElements = [{
      id: 'accordion-collapse-heading-1',
      triggerEl: document.querySelector('#accordion-collapse-heading-1') as HTMLElement,
      targetEl: document.querySelector('#accordion-collapse-body-1') as HTMLElement,
      active: true
    },
    {
      id: 'accordion-collapse-heading-2',
      triggerEl: document.querySelector('#accordion-collapse-heading-2') as HTMLElement,
      targetEl: document.querySelector('#accordion-collapse-body-2') as HTMLElement,
      active: false
    },
    {
      id: 'accordion-collapse-heading-3',
      triggerEl: document.querySelector('#accordion-collapse-heading-3') as HTMLElement,
      targetEl: document.querySelector('#accordion-collapse-body-3') as HTMLElement,
      active: false
    },
    {
      id: 'accordion-collapse-heading-4',
      triggerEl: document.querySelector('#accordion-collapse-heading-4') as HTMLElement,
      targetEl: document.querySelector('#accordion-collapse-body-4') as HTMLElement,
      active: false
    },
    {
      id: 'accordion-collapse-heading-5',
      triggerEl: document.querySelector('#accordion-collapse-heading-5') as HTMLElement,
      targetEl: document.querySelector('#accordion-collapse-body-5') as HTMLElement,
      active: false
    },];
    this.accordion = new Accordion(this.accordionElement, this.accordionElements);
  }

}
