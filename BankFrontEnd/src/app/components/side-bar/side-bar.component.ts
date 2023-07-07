import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { removeCookie } from 'typescript-cookie'
@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit {

  constructor(private route: Router) { }

  ngOnInit(): void {
  }

  logout(){
    removeCookie('userToken')
    this.route.navigate(['/'])
  }
}
