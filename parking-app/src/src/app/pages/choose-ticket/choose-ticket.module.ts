import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChooseTicketPageRoutingModule } from './choose-ticket-routing.module';

import { ChooseTicketPage } from './choose-ticket.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChooseTicketPageRoutingModule
  ],
  declarations: [ChooseTicketPage]
})
export class ChooseTicketPageModule {}
