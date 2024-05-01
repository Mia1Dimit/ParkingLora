import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-choose-ticket',
  templateUrl: './choose-ticket.page.html',
  styleUrls: ['./choose-ticket.page.scss'],
})
export class ChooseTicketPage implements OnInit {


  segment:string='zoneA';

  constructor(private router:Router) { }

  book() {
    this.router.navigate(['booking'])
  }

  segmentChanged(ev:any){
    this.segment= ev.target.value;   
  }

  ngOnInit() {
  }

}
