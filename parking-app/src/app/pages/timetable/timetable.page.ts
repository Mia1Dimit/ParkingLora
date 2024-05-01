import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-timetable',
  templateUrl: './timetable.page.html',
  styleUrls: ['./timetable.page.scss'],
})
export class TimetablePage implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {
  }

  goToBook() {
    this.router.navigate(['home'])
  }
}
