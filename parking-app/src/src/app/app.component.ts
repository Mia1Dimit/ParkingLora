import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    {title:'My Bookings', url:'my-bookings',icon:'bag'},
    {title:'Timetable', url:'',icon:'time'},
    {title:'About us', url:'',icon:'information-circle'},
    {title:'Contact', url:'',icon:'call'}
  ];
  
  constructor() {}
}
