import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {HttpClient} from '@angular/common/http';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})


export class LoginPage implements OnInit {
  username:string
  email:string
  password:string
  isLoading:boolean = false
  constructor(private router:Router,private http:HttpClient,private alertController:AlertController) { }

  ngOnInit() {
  }

  login(){
    this.isLoading = true
    let credentials = {
      email: this.email,
      password: this.password
    }
    this.http.post('http://localhost:3000/users/login',credentials)
    .subscribe(res =>{
      this.router.navigate(['home']);
      localStorage.setItem('User',JSON.stringify(res))
      
      //this.username = JSON.parse(localStorage.User)['username']; 
    },error =>{
      this.isLoading = false
      this.presentAlert('Login Failed',error.error.error)  
    })
  }

  async presentAlert(header:string,message:string) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: ['OK'],
    });
    await alert.present();
  }
  
}