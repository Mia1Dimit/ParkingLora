import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChooseTicketPage } from './choose-ticket.page';
import { BookingPage } from '../booking/booking.page';


const routes: Routes = [
  { path: '', component: ChooseTicketPage},
  { path: 'booking', component: BookingPage},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChooseTicketPageRoutingModule {}
