import { Component, Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ViewChild, ElementRef } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Geolocation } from '@ionic-native/geolocation/ngx';


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
  markers = [
    {title: "Parking Estias",
    latitude: "38.28628855226525",
    longitute: "21.789252139969708",
    charger: "no"},
    {title: "Parking Octagon",
    latitude: "38.28617810072456",
    longitute: "21.785400691005528",
    charger: "no"}, 
    {title: "Parking Sunedriakou",
    latitude: "38.28970638219847",
    longitute: "21.786707737181683",
    charger: "no"},
    {title: "Parking Hlektrologwn(has charger)",
    latitude: "38.2877194667251",
    longitute: "21.78782073548473",
    charger: "yes"},
    {title: "Parking Politikwn(has charger)",
    latitude: "38.28764795851085",
    longitute: "21.786988050281234",
    charger: "yes"},
    {title: "Parking Fusikou(has charger)",
    latitude: "38.290214004378804",
    longitute: "21.78963930280649",
    charger: "yes"},
    {title: "Parking Vivliothikis(has charger)",
    latitude: "38.28889908861255",
    longitute: "21.791145188542952",
    charger: "yes"}
  ];


  ngOnInit() {
  }

  checkbox = document.getElementsByClassName("check");

  _ionChange(event) {
    if(this.checkbox[0].ariaChecked==="false") {
      this.displayElectric(this.mapMARKERS);
    }   
    else {
      this.displayAll(this.mapMARKERS);
    }
  }

  latitude: any;
  longitude: any;
  public static lat;
  public static lon;


  constructor(private router:Router,public navCtrl:NavController,public geo:Geolocation) { }

  

  ionViewDidEnter () {
    this.showMap();
  }

  addMarkersToMap(markers) {
    for(let marker of markers) {
      let position = new google.maps.LatLng(marker.latitude,marker.longitute);
      let mapMarker = new google.maps.Marker({
        position: position,
        title: marker.title    
      });
      this.mapMARKERS.push(mapMarker)
      mapMarker.setMap(this.map);
      this.addInfoWindowToMarker(mapMarker);
    }
    
  }

  addInfoWindowToMarker(marker) {
    let infoWindowContent = '<div id="content" height="300px">'+
                            '<h2 id="firstHeading" class="firstHeading">'+
                            marker.title+
                            '</h2>'+
                            '</div>';
    let infoWindow = new google.maps.InfoWindow({
      content:infoWindowContent,
      ariaLabel: "Uluru"
    });
    
    marker.addListener('click', () => {
      this.closeAllInfoWindows();    
      infoWindow.open(this.map,marker)
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
        
        HomePage.lat = place.geometry.viewport.Ia.lo;
        HomePage.lon = place.geometry.viewport.Wa.lo;
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
    });
  }


  displayElectric (markers) {
    this.closeAllInfoWindows();
    let i = 0;
    for(let marker of markers) {
      if(i<3)
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
    this.router.navigate(['choose-ticket'])
  }

}
