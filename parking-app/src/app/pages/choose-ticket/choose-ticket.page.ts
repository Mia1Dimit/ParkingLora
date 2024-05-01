import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {HttpClient} from '@angular/common/http';

declare var google: any;

@Component({
  selector: 'app-choose-ticket',
  templateUrl: './choose-ticket.page.html',
  styleUrls: ['./choose-ticket.page.scss'],
})

export class ChooseTicketPage implements OnInit {
  markers:any;
  markersUpdate:any = [] ;

  markerA: any;
  titleA:string;
  elchargerA:string;
  availableSpotNumberA: Number;
  maximumParkingDurationA: string;
  totalSpotNumberA: Number;
  refParkingSpotA: string;  
  priceA: string = "1.5";
  zone:string='zoneA';
  
  markerB: any;
  titleB:string;
  elchargerB:string;
  availableSpotNumberB: Number;
  maximumParkingDurationB: string;
  totalSpotNumberB: Number;
  refParkingSpotB: string;
  priceB: string = "1";  


  constructor(private router:Router,private http:HttpClient) { }

  ngOnInit() {
    this.getmarkers();
  }

  ionViewDidEnter () {
    this.find();
  }

  getmarkers(){
    this.http.get('http://localhost:3000/groups')
    .subscribe( marker =>{
      this.markers = marker;
    },error =>{
      console.log(error.error)
    });
   
  } 

  distances=[];
  localzone=[];
  index =0;
  latitude: any;
  longitude: any;

  getDistances() {
    let locations = [];
    let location = new google.maps.LatLng(localStorage.getItem("lat"),localStorage.getItem("lon"));
    let chargerExists = localStorage.getItem("charger");
    for(let marker of this.markers){
      if (marker.elcharger!=chargerExists){
        this.markersUpdate.push(marker);
      }
    }

    
    for (let marker of this.markersUpdate){
      let newLoc = new google.maps.LatLng(marker.latitude,marker.longitude);
      console.log(marker.latitude,marker.longitude)
      locations.push(newLoc)
      this.localzone.push(marker.zone);
    }    
    
    

    for(let j of locations) {
      this.distances.push(google.maps.geometry.spherical.computeDistanceBetween(location,j));
    }
  }


  find() {
    let minA = 5000;
    let minB = 5000;
    let indexA = 0;
    let indexB = 0;
    this.getDistances()
    console.log((this.distances));
    for(let i in this.distances) {
      //console.log(this.markers[i]['availableSpotNumber']);
      let localmin = this.distances[i];
      if(this.localzone[i]=="A"&&(this.markersUpdate[i]['availableSpotNumber']>0)) {
        console.log(this.markersUpdate[i]['availableSpotNumber']);
        if (localmin<=minA){
          minA= localmin;
          indexA = parseInt(i);
        }     
      } 
      else if (this.localzone[i]=="B"&&this.markersUpdate[i]['availableSpotNumber']>0){
        if (localmin<=minB){
          minB= localmin;
          indexB = parseInt(i);
        }       
      }  
      console.log("index", indexA, "minA", minA)    
    }    
    
    
    //console.log("Index ",indexA, indexB, "Min", minA, minB);

    this.markerA = this.markersUpdate[indexA]
    this.markerB = this.markersUpdate[indexB]

    this.elchargerA = this.markerA.elcharger,
    this.titleA = this.markerA.title,
    this.availableSpotNumberA = this.markerA.availableSpotNumber,
    this.maximumParkingDurationA = this.markerA.maximumParkingDuration,
    this.refParkingSpotA = this.markerA.refParkingSpot,
    this.totalSpotNumberA = this.markerA.totalSpotNumber;

    this.elchargerB = this.markerB.elcharger,
    this.titleB = this.markerB.title,
    this.availableSpotNumberB = this.markerB.availableSpotNumber,
    this.maximumParkingDurationB = this.markerB.maximumParkingDuration,
    this.refParkingSpotB = this.markerB.refParkingSpot,
    this.totalSpotNumberB = this.markerB.totalSpotNumber;
    
  }
  
  bookA() {
    localStorage.setItem("duration",this.markerA['maximumParkingDuration']);
    localStorage.setItem("price",this.priceA);
    localStorage.setItem("ref",this.markerA['refParkingSpot']);
    /*console.log(this.slot)
    console.log(this.duration)
    console.log(this.price)
    console.log(this.zone)*/
    this.router.navigate(['booking'])
  }
  
  bookB() {
    localStorage.setItem("duration",this.markerB['maximumParkingDuration']);
    localStorage.setItem("price",this.priceB);
    localStorage.setItem("ref",this.markerB['refParkingSpot']);
    /*localStorage.setItem("slot",this.slot);
    localStorage.setItem("duration",this.duration);
    localStorage.setItem("price",this.price);*/
    //localStorage.setItem("duration",this.duration);
    /*console.log(this.slot)
    console.log(this.duration)
    console.log(this.price)
    console.log(this.zone)*/
    this.router.navigate(['booking'])
  }

  segmentChanged(ev:any){
    this.zone= ev.target.value;   
  }



}