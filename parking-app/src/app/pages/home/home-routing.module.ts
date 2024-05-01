import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePage } from './home.page';
import { ChooseTicketPage } from '../choose-ticket/choose-ticket.page';

const routes: Routes = [
  { path: '', component: HomePage},
  { path: 'choose-ticket', component: ChooseTicketPage}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomePageRoutingModule {}
