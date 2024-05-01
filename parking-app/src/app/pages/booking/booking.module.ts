import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { BookingPageRoutingModule } from './booking-routing.module';

import { BookingPage } from './booking.page';
import { QRCodeModule } from 'angularx-qrcode';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BookingPageRoutingModule,
    QRCodeModule
  ],
  declarations: [BookingPage]
})
export class BookingPageModule {
  
}
