import { Component, Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ViewChild, ElementRef } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { AlertController } from '@ionic/angular';
import {HttpClient} from '@angular/common/http';
import { title } from 'process';


declare var google: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
@Injectable()

export class HomePage implements OnInit {

  public map: any;
  @ViewChild('map', {read: ElementRef, static: true}) mapRef: ElementRef;


  infoWindows: any = [];
  mapMARKERS: any = [];
  
  
  //totalAvailable: number = 0;
  //total: number = 0;
  load: number;
  spots: any;



  ngOnInit() {
    this.name = JSON.parse(localStorage.getItem("User"))['username'];
    this.getmarkers();
    //this.getSpots();
  }

  

  name: string;
  checkVal: string;
  checkbox = document.getElementsByClassName("check");

  _ionChange(event) {
    if(this.checkbox[0].ariaChecked==="false") {
      this.checkVal = "no";
      this.displayElectric(this.mapMARKERS);
    }   
    else {
      this.checkVal = "yes";
      this.displayAll(this.mapMARKERS);
    }
  }

  latitude: any;
  longitude: any;
  public static lat;
  public static lon;
  

  constructor(private router:Router,private http:HttpClient,public navCtrl:NavController,private alertController: AlertController,public geo:Geolocation) { }
  markers: any= []
  getmarkers(){
    this.http.get('http://localhost:3000/groups')
    .subscribe(marker =>{
      this.markers.push(marker);
      this.markers = this.markers[0];
    },error =>{
      console.log(error.error)
    })
  }  
  box: any;
  ionViewDidEnter () {
    this.showMap();
  }

  addMarkersToMap(markers) {
    for(let marker of markers) {
      let position = new google.maps.LatLng(marker.latitude,marker.longitude);
      let mapMarker;
      let label;
      if(marker.availableSpotNumber == 0){
         label = "F";
      }else{
         label = null;
      }
      if (marker.zone=="B") {
        
        mapMarker = new google.maps.Marker({
          position: position,
          label: label,
          title: marker.title + ", Availability: "+marker.availableSpotNumber+"/"+marker.totalSpotNumber,
          icon: {
            url: "http://maps.google.com/mapfiles/ms/icons/green-dot.png"
          } 
        }); 
      } else {
        mapMarker = new google.maps.Marker({
          position: position,
          label: label,
          title: marker.title + ", Availability: "+marker.availableSpotNumber+"/"+marker.totalSpotNumber,
        });
      }

      
      this.mapMARKERS.push(mapMarker)
      mapMarker.setMap(this.map);
      this.addInfoWindowToMarker(mapMarker);
    }
      
  }

  addInfoWindowToMarker(marker) {
    let title = marker.title.split(',')[0];
    let capacity = marker.title.split(',')[1];
    console.log(marker.elcharger)
    let infoWindowContent = '<div style="color:#000">'+
                           '<h2 id="firstHeading" class="firstHeading">'+
                           title+
                           '</h2>'+
                           capacity+
                           '</div>';
    // let infoWindowContent = '<div class="infoW" color="black">'+marker.title+'</div>';
    // let infoWindowContent = "hello <b> aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaWorld</b>";
    let infoWindow = new google.maps.InfoWindow({
      content:infoWindowContent,
      
    });
    //infoWindow.setContent("helloWorld");
    //this.box = document.getElementById("description");
    marker.addListener('click', () => {
      this.closeAllInfoWindows();    
      infoWindow.open({
        anchor: marker,
        map: this.map
      })
      
      //this.box.innerHTML = marker.title;
      //console.log(this.box.innerHTML)
    });
    this.infoWindows.push(infoWindow);  
  }

  closeAllInfoWindows() {
    for(let window of this.infoWindows) {
      window.close()
    }
  }

  showMap () {
    const location = new google.maps.LatLng(38.28828587661458, 21.788036796703746);
    const options = {
      center: location,
      zoom: 15,
      disableDefaultUI: true
    }
    this.map = new google.maps.Map(this.mapRef.nativeElement, options);
    
    this.addMarkersToMap(this.markers);
    
    this.showSearchbar(this.map);
  }

  showSearchbar(map) {
    
    let input = document.getElementById('searchInput');
    let searchBox = new google.maps.places.SearchBox(input);
    
    let searchMarkers =[];
    searchBox.addListener('places_changed',function() {
      let places = searchBox.getPlaces();
      if(places.length==0){
        return;
      }
      searchMarkers.forEach(function(marker) {
        marker.setMap(null);
      });
      searchMarkers = [];
      let bounds = new google.maps.LatLngBounds();
      places.forEach(function(place){
        
        HomePage.lat = place.geometry.location.lat();
        localStorage.setItem("lat",HomePage.lat);
        HomePage.lon = place.geometry.location.lng();
        localStorage.setItem("lon",HomePage.lon);
        if(!place.geometry){
          console.log("No geometry");
          return;
        }
        let icon = {
          url: place.icon,
          size: new google.maps.Size(71,71),
          origin: new google.maps.Point(0,0),
          anchor: new google.maps.Point(17,34),
          scaledSize: new google.maps.Size(25,25)
        };
        searchMarkers.push(new google.maps.Marker({
          map: map,
          icon: icon,
          title: place.name,
          position: place.geometry.location
        }));
        if(place.geometry.viewport){
          bounds.union(place.geometry.viewport);
        } else {
          bounds.extend(place.geometry.location);
         
        }
      });
      map.fitBounds(bounds);
      
      //localStorage.setItem("location",place.geometry.location);
    });
    
  }


  displayElectric (markers) {
    this.closeAllInfoWindows();
    let i = 0;
    for(let marker of markers) {
      if(i==0||i==1||i==6)
        marker.setVisible(false);
        i++;
    }
  }

  displayAll (markers) {
    this.closeAllInfoWindows();
    for(let marker of markers) {
      marker.setVisible(true);
    }
  }

  chooseTicket() {
    let dest = (<HTMLInputElement> document.getElementById('searchInput')).value;   

    if(dest=="") {
      this.warnDest();      
    } else {
      localStorage.setItem("destination",dest);
      localStorage.setItem("charger",this.checkVal);
      this.router.navigate(['choose-ticket']);
    }
  }
  

  getSpots(){
    
    this.http.get('http://localhost:3000/spots')
    .subscribe( spot =>{
      //this.spots.push(spot);
      this.spots = spot;
      //this.spots = this.spots[0];
    },error =>{
      console.log(error.error)
    });
  }


  async warnDest() {
    const alert = await this.alertController.create({
      header: 'Warning!',
      message: 'You have to insert your destination in the field.',
      cssClass: 'custom-alert',
      buttons: [
        {text: 'OK',cssClass: 'alert-button-cancel',handler: () => {this.router.navigate(['home']);}},
      ],
    });
    await alert.present();
  }

}