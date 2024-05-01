import { Component, OnInit } from '@angular/core';
import { AlertController} from '@ionic/angular';
import { Router } from '@angular/router';
import {HttpClient} from '@angular/common/http'

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  email:string
  username:string
  password:string
  confirmPassword:string
  plateNumber:string
  isLoading:boolean = false
  
  constructor(private http:HttpClient,private alertController: AlertController,private router: Router) {}

  register(){
    this.isLoading = true
    let user = {
      email: this.email,
      username: this.username,
      password: this.password,
      confirmPassword: this.confirmPassword,
      plateNumber: this.plateNumber      
    }
    this.http.post('http://localhost:3000/users/register',user)
    .subscribe(res =>{
      this.isLoading = false
      localStorage.setItem('User',JSON.stringify(res))
      this.presentAlert('Registration Succesful','Press OK to navigate in our app')
      this.router.navigateByUrl('home')
    },error=>{
      this.isLoading = false
      this.presentAlert('Registration Failed',error.error.error)
    })
  }
  async presentAlert(header:string,message:string) {    
    const alert = await this.alertController.create({
      header:header,
      message:message,
      buttons: ['OK'],
    });
    await alert.present();
  }
  
  ngOnInit() {
  }
}
  

