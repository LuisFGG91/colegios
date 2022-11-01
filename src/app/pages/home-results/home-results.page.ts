import { Component } from '@angular/core';
import {
  NavController,
  AlertController,
  MenuController,
  ToastController,
  PopoverController,
  ModalController
} from '@ionic/angular';

// Modals
import { SearchFilterPage } from '../modal/search-filter/search-filter.page';
import { ImagePage } from '../modal/image/image.page';
// Call notifications test by Popover and Custom Component.
import { NotificationsComponent } from '../../components/notifications/notifications.component';

import { Geolocation, Geoposition } from '@awesome-cordova-plugins/geolocation/ngx';

var lat = 0;
var lon = 0;


@Component({
  selector: 'app-home-results',
  templateUrl: './home-results.page.html',
  styleUrls: ['./home-results.page.scss']
})




export class HomeResultsPage {
  
  searchKey = '';
  yourLocation = '123 Test Street';
  themeCover = 'assets/img/LogoEscritorio.png';

  constructor(
    public geoCtrl: Geolocation,
    public navCtrl: NavController,
    public menuCtrl: MenuController,
    public popoverCtrl: PopoverController,
    public alertCtrl: AlertController,
    public modalCtrl: ModalController,
    public toastCtrl: ToastController
  
    ) {
  
  }

  ionViewWillEnter() {
    this.menuCtrl.enable(true);
  }

  settings() {
    this.navCtrl.navigateForward('settings');
  }

  async alertLocation() {
    const changeLocation = await this.alertCtrl.create({
      header: 'Change Location',
      message: 'Type your Address.',
      inputs: [
        {
          name: 'location',
          placeholder: 'Enter your new Location',
          type: 'text'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Change',
          handler: async (data) => {
            console.log('Change clicked', data);

            this.yourLocation = data.location;
            this.yourLocation = lat + ' || ' + lon;
            const toast = await this.toastCtrl.create({
              message: 'Location was change successfully',
              duration: 3000,
              position: 'top',
              buttons: [
                {
                  text: 'Done',
                  role: 'cancel',
                  handler: () => {
                    console.log('Cancel clicked');
                  }
                }
              ]
            });

            toast.present();
          }
        }
      ]
    });
    changeLocation.present();
  }

  async searchFilter() {
    const modal = await this.modalCtrl.create({
      component: SearchFilterPage
    });
    return await modal.present();
  }
  async ngAfterViewInit() {
    this.obtGeo();
    this.otraForma();
  }
  async obtGeo() {
    this.geoCtrl.getCurrentPosition().then((resp) => {
      console.log(resp.coords.latitude)
      console.log(resp.coords.longitude)
      lat = resp.coords.latitude;
      lon = resp.coords.longitude;

    }).catch((error) => {
      console.log('Ocurrio un Error al obterner las coordinadas', error);
    });

  }

  async otraForma() {
    this.geoCtrl.getCurrentPosition().then((gp: Geoposition) => {
      console.log(gp)
      console.log(gp)
    }).catch((error) => {
      console.log('Ocurrio un Error al obterner las coordinadas', error);
    });
  }


  async presentImage(image: any) {
    const modal = await this.modalCtrl.create({
      component: ImagePage,
      componentProps: { value: image }
    });
    return await modal.present();
  }

  async notifications(ev: any) {
    const popover = await this.popoverCtrl.create({
      component: NotificationsComponent,
      event: ev,
      animated: true,
      showBackdrop: true
    });
    return await popover.present();
  }

}
