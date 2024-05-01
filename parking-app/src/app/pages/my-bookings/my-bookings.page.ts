import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-my-bookings',
  templateUrl: './my-bookings.page.html',
  styleUrls: ['./my-bookings.page.scss'],
})
export class MyBookingsPage implements OnInit {

  constructor(private router:Router,private http:HttpClient) { }

  username = JSON.parse(localStorage.getItem("User"))['username'];
  plateNumber = JSON.parse(localStorage.getItem("User"))['plateNumber'];
  plate:any;
  slot:any;
  duration:any;
  price:any;
  qr:any;


details: any= []
myTickets: any=[]

  getTicket(){
    this.http.get('http://localhost:3000/bookings')
    .subscribe(ticket =>{
      this.details.push(ticket);
      this.details = this.details[0];
      this.check(this.details);
    },error =>{
      console.log(error.error)
    })

  } 

  check(details){
    for(let ticket of details) {
      if(ticket.plate==this.plateNumber){
        this.myTickets.push(ticket)
      }else{
        console.log('Den yparxei kratisi me afti tin pinakida');
      }
    }
  }

  ngOnInit() { 
    this.getTicket()
  }

  goHome() {
    this.router.navigate(['home']) 
  }

}