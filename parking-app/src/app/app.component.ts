import { Component } from '@angular/core';
import { LoginPage } from './pages/login/login.page';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    {title:'My Bookings', url:'my-bookings',icon:'bag'},
    {title:'Timetable & Pricing', url:'timetable',icon:'time'},
    {title:'About us', url:'about-us',icon:'information-circle'}
  ];
 
  constructor(private router:Router) {
    this.name = JSON.parse(localStorage.getItem("User"))['username'];
  }
  name: string;
  

  ngOnInit() {
  }

  logOut() {
    this.router.navigate(['login']) 
  }
}

