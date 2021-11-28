import { HttpClient } from '@angular/common/http';
import { AfterViewInit } from '@angular/core';
import { Component, ViewChild } from '@angular/core';
import { GoogleMap } from '@angular/google-maps'
import { Observable } from 'rxjs';
import { GeoFeatureCollection } from './models/geojson.model';
import { Ci_vettore } from './models/ci_vett.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {

  title = 'server mappe';
  //Variabile che conterrà i nostri oggetti GeoJson
  geoJsonObject: GeoFeatureCollection;
  //Observable per richiedere al server python i dati sul DB
  obsGeoData: Observable<GeoFeatureCollection>;
  // Centriamo la mappa
  center: google.maps.LatLngLiteral = { lat: 45.506738, lng: 9.190766 };
  media: google.maps.LatLngLiteral = { lat: 0, lng: 0 };
  zoom = 8;
  obsCiVett: Observable<Ci_vettore[]>; //Crea un observable per ricevere i vettori energetici
  markerList: google.maps.MarkerOptions[];
  circleOptions: google.maps.LatLng;
  
  constructor(public http: HttpClient) {
    //Facciamo iniettare il modulo HttpClient dal framework Angular (ricordati di importare la libreria)

  }

  //Metodo che scarica i dati nella variabile geoJsonObject
  prepareData = (data: GeoFeatureCollection) => {
    this.geoJsonObject = data
    console.log(this.geoJsonObject);
  }

  //Una volta che la pagina web è caricata, viene lanciato il metodo ngOnInit scarico i dati dal server
  ngAfterViewInit() {
    /* this.obsGeoData = this.http.get<GeoFeatureCollection>("https://5000-white-aardvark-yuka8omo.ws-eu18.gitpod.io/ci_vettore/50");
     this.obsGeoData.subscribe(this.prepareData); */
    this.obsCiVett = this.http.get<Ci_vettore[]>(`https://5000-white-aardvark-yuka8omo.ws-eu17.gitpod.io/ci_vettore/140`);
    this.obsCiVett.subscribe(this.prepareCiVettData);
  }

  ngOnInit() {
    //this.circleOptions =  {fillColor : 'red', clickable : true, editable : true}

  }

  //Questo metodo richiama la route sul server che recupera il foglio specificato nella casella di testo
  cambiaFoglio(foglio): boolean {
    let val = foglio.value; //Commenta qui
    console.log(foglio.value);
    this.obsCiVett = this.http.get<Ci_vettore[]>(`https://5000-white-aardvark-yuka8omo.ws-eu17.gitpod.io/ci_vettore/${val}`);  //Commenta qui
    this.obsCiVett.subscribe(this.prepareCiVettData); //Commenta qui
    return false;
  }
  mapClicked($event: google.maps.MapMouseEvent) {
    console.log($event);
    let coords= $event.latLng; //Queste sono le coordinate cliccate
    this.center = { lat: coords.lat(), lng: coords.lng() };
  }
  prepareCiVettData = (data: Ci_vettore[]) => {
    console.log(data); //Verifica di ricevere i vettori energetici
    this.markerList = []; //NB: markers va dichiarata tra le proprietà markers : Marker[]
    for (const iterator of data) { //Per ogni oggetto del vettore creo un Marker
      let m: google.maps.MarkerOptions =
      {
        position: new google.maps.LatLng(iterator.WGS84_X, iterator.WGS84_Y),
        icon: this.findImage(iterator.CI_VETTORE)
      }
      //Marker(iterator.WGS84_X,iterator.WGS84_Y,iterator.CI_VETTORE);
      this.markerList.push(m);
    }
    console.log(this.LatLngMedia(data));
    this.center = this.LatLngMedia(data);
    this.zoom = 15;
  }

  LatLngMedia(data: Ci_vettore[]): google.maps.LatLngLiteral {
    /*TODO : IMPLEMENTA IL METODO CHE CALCOLA LATITUDINE E LONGITUDINE MEDIA
    //NOTA: IL CAMPO WGS84_X contiene la latitudine
    //const mediaLon = data['result'].reduce((a, b) => parseFloat(a['WGS84_X'] + b['WGS84_X']), 0) / data['result'].length;
    const mediaLat = data['result'].reduce((a, b) => parseFloat(a['WGS84_Y'] + b['WGS84_Y']), 0) / data['result'].length;
    */
    let latList = 0
    let lonList = 0
    data.forEach(element => {
      latList += parseFloat(String(element['WGS84_X']))
      lonList += parseFloat(String(element['WGS84_Y']))
    });
    let mediaLat = latList / data.length
    let mediaLon = lonList / data.length
    this.media = { lat: mediaLat, lng: mediaLon };
    return this.media
  }
  findImage(label: string): google.maps.Icon {
    if (label.includes("Gas")) {
      return { url: './assets/img/flame.ico', scaledSize: new google.maps.Size(32, 32) };
    }
    if (label.includes("elettrica")) {
      return { url: './assets/img/flash.ico', scaledSize: new google.maps.Size(32, 32) };
    }
    //Se non viene riconosciuta nessuna etichetta ritorna l'icona undefined
    return { url: './assets/img/undefined.ico', scaledSize: new google.maps.Size(32, 32) }
  }

}
