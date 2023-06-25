import { Component, OnInit } from '@angular/core';
import * as Aos from 'aos'

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    Aos.init({
      once: true
    });
  }

}
