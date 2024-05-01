import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-booking',
  templateUrl: './booking.page.html',
  styleUrls: ['./booking.page.scss'],
})
export class BookingPage implements OnInit {

  constructor(private router:Router,private alertController: AlertController) { }

  isModalOpen = false;

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }

  async cancelBooking() {
    const alert = await this.alertController.create({
      header: 'Are you sure you want to cancel your booking?',
      message: 'If you click yes all of your progress will be lost.',
      cssClass: 'custom-alert',
      buttons: [
        {text: 'No',cssClass: 'alert-button-cancel',handler: () => {this.router.navigate(['booking']);}},
        {text: 'Yes',cssClass: 'alert-button-confirm',handler: () => {this.router.navigate(['home']);}},
      ],
    });
    await alert.present();
  }

  ngOnInit() {
  }

}
