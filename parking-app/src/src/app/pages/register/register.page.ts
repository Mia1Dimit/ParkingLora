import { Component, OnInit } from '@angular/core';
import { AlertController} from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  handlerMessage = '';
  
  constructor(private alertController: AlertController,private router: Router) {}

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Register Successful',
      buttons: [       
        {text: 'OK',role: 'confirm',handler: () => {this.router.navigate(['home']);}}
      ],
    });
    await alert.present();
  }
  
  ngOnInit() {
  }
}
  

