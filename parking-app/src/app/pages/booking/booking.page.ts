import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { IonModal } from '@ionic/angular';
import {HttpClient} from '@angular/common/http';


@Component({
  selector: 'app-booking',
  templateUrl: './booking.page.html',
  styleUrls: ['./booking.page.scss'],
})
export class BookingPage implements OnInit {
  @ViewChild(IonModal) modal: IonModal;
  constructor(private router:Router,private alertController: AlertController,private http:HttpClient) { }

  isModalOpen = false;


  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }
  username = JSON.parse(localStorage.getItem("User"))['username'];
  plate = JSON.parse(localStorage.getItem("User"))['plateNumber'];
  slot: string;
  duration = localStorage.getItem("duration");
  price = localStorage.getItem("price");
  

  setBooking(){

    this.http.post('http://localhost:3000/groups/booking', { refParkingSpot: localStorage.getItem("ref")}).subscribe((res) => {
      console.log(res);
    });

    this.http.post('http://localhost:3000/spots/booking', { name: this.slot}).subscribe((res) => {
      console.log(res);
    });
     
    let details = {
      username: this.username,
      plate: this.plate,
      slot: this.slot,
      duration: this.duration,
      price: this.price,
    }
    this.http.post('http://localhost:3000/bookings/booking',details)
    .subscribe(res =>{
      this.setOpen(true);
      localStorage.setItem('Booking',JSON.stringify(res))
      //console.log(localStorage.getItem('Booking'))
      //this.username = JSON.parse(localStorage.User)['username']; 
    },error =>{
      console.log(error.error)
    })
  }

  cancel() {
    this.modal.dismiss(null, 'cancel');
    this.router.navigate(['home']);

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
  spots: any;
  findSlot(){
    this.http.get('http://localhost:3000/spots')
    .subscribe( spot =>{
      this.spots = spot;
      //this.spots = this.spots[0];
    },error =>{
      console.log(error.error)
    });

  }

  ngOnInit() {
    this.findSlot();
  }

  ionViewDidEnter () {
    let refer = localStorage.getItem("ref");  
    for(let i of this.spots) {
      if (i.status=="free" && i.refParkingGroup==refer){
        this.slot = i.name;
        break
      }        
    }
  }

}