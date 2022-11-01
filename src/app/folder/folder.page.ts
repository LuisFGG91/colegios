import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Geolocation, Geoposition } from '@awesome-cordova-plugins/geolocation/ngx';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit {
  public folder: string;

  constructor(
              private activatedRoute: ActivatedRoute,
              public geo: Geolocation){
                this.obtGeo();
              }

  ngOnInit() {
    this.folder = this.activatedRoute.snapshot.paramMap.get('id');
  }
  ngAfterViewInit(){
    this.obtGeo();
    this.otraForma();
  }
  obtGeo(){
    this.geo.getCurrentPosition().then((resp) => {
      console.log(resp.coords.latitude)
      console.log(resp.coords.longitude)
     }).catch((error) => {
       console.log('Ocurrio un Error al obterner las coordinadas', error);
     });
   }

   otraForma(){

    this.geo.getCurrentPosition().then((gp:Geoposition) => {
      console.log(gp)
      console.log(gp)
     }).catch((error) => {
       console.log('Ocurrio un Error al obterner las coordinadas', error);
     });
   }

/*
  localization(){
    this.geolocation.getCurrentPosition().then((resp) => {
      // resp.coords.latitude
      // resp.coords.longitude
    }).catch((error) => {
        console.log('Error getting location', error);
      });
      
      let watch = this.geolocation.watchPosition();
      watch.subscribe((data) => {
      // data can be a set of coordinates, or an error (if an error occurred).
      // data.coords.latitude
      // data.coords.longitude
    });
  }
*/


}
