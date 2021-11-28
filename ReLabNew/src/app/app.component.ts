import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ReLabNew';
  center: any;

  label: string;
  label2: string;

  position: any;
  position2: any;
  positionProcione1: any;
  positionProcione2: any;
  positionProcione3: any;

  circleOptions: { fillColor: string; };
  markerOptions: google.maps.MarkerOptions;
  markerOptions1: google.maps.MarkerOptions;
  markerOptions2: google.maps.MarkerOptions;
  markerOptions3: google.maps.MarkerOptions;
  
  vertices: google.maps.LatLngLiteral[];
  verticesOptions: { fillColor: string; };
  vertices2: google.maps.LatLngLiteral[];
  verticesOptions2: { fillColor: string; };
  
  constructor() {
    this.center = { lat: 45.506738, lng: 9.190766 };
    this.position = this.center;
    this.label = "ciao";
    this.label2 = "Procione invisibile";

    this.position2 = { lat: 45.506738, lng: 9.191900 };
    this.positionProcione1 = { lat: 45.506000, lng: 9.190500 };
    this.positionProcione2 = { lat: 45.506500, lng: 9.191500 };
    this.positionProcione3 = { lat: 45.506800, lng: 9.193000 };

    this.circleOptions = { fillColor: 'red' };
    this.verticesOptions = { fillColor: 'red' };
    this.verticesOptions2 = { fillColor: 'red' };

    this.vertices = [
      { lat: this.center.lat + 0.001, lng: this.center.lng - 0.002 },
      { lat: this.center.lat, lng: this.center.lng },
      { lat: this.center.lat - 0.001, lng: this.center.lng - 0.002 }
    ];
    this.vertices2 = [
      { lat: this.center.lat + 0.001, lng: this.center.lng + 0.002 },
      { lat: this.center.lat + 0.001, lng: this.center.lng },
      { lat: this.center.lat - 0.001, lng: this.center.lng },
      { lat: this.center.lat - 0.001, lng: this.center.lng + 0.002 }
    ];

    let iconData: google.maps.Icon = {
      url: './assets/img/cat_acrobat.ico',
      scaledSize: new google.maps.Size(60, 60)
    }

    let iconData2: google.maps.Icon = {
      url: './assets/img/raccoon (1).png',
      scaledSize: new google.maps.Size(60, 60)
    }
    let iconData3: google.maps.Icon = {
      url: './assets/img/raccoon (2).png',
      scaledSize: new google.maps.Size(60, 60)
    }
    let iconData4: google.maps.Icon = {
      url: './assets/img/raccoon (3).png',
      scaledSize: new google.maps.Size(60, 60)
    }
    this.markerOptions = { icon: iconData }
    this.markerOptions1 = { icon: iconData2 }
    this.markerOptions2 = { icon: iconData3 }
    this.markerOptions3 = { icon: iconData4 }
  }

  redChange() {
    this.circleOptions = { fillColor: 'red' }
    this.verticesOptions = { fillColor: 'red' };
  }
  pinkChange() {
    this.circleOptions = { fillColor: 'pink' }
    this.verticesOptions = { fillColor: 'pink' };
  }
  purpleChange() {
    this.circleOptions = { fillColor: 'purple' }
    this.verticesOptions = { fillColor: 'purple' };
  }
  redChangeR() {
    this.verticesOptions2 = { fillColor: 'red' }
  }
  pinkChangeR() {

    this.verticesOptions2 = { fillColor: 'pink' }
  }
  purpleChangeR() {

    this.verticesOptions2 = { fillColor: 'purple' }
  }


}

