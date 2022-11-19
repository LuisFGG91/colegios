import { Component,ElementRef,ViewChild } from '@angular/core';
import {
  NavController,
  AlertController,
  MenuController,
  ToastController,
  PopoverController,
  ModalController,
  LoadingController,
} from '@ionic/angular';

import jsQR from 'jsqr';

// Modals
import { SearchFilterPage } from '../modal/search-filter/search-filter.page';
import { ImagePage } from '../modal/image/image.page';
// Call notifications test by Popover and Custom Component.
import { NotificationsComponent } from '../../components/notifications/notifications.component';

import { Geolocation, Geoposition } from '@awesome-cordova-plugins/geolocation/ngx';

import { BarcodeScanner } from '@awesome-cordova-plugins/barcode-scanner/ngx';


var lat = 0;
var lon = 0;


@Component({
  selector: 'app-home-results',
  templateUrl: './home-results.page.html',
  styleUrls: ['./home-results.page.scss']
})




export class HomeResultsPage {
  private isBackMode: boolean = true;
  private isFlashLightOn: boolean = false;
  private scanSub: any;
  public scanActive = false;
  public scanResult = null;
  public code: any;
  public videoElement: any;
  public canvasElement: any;
  public canvasContext: any;
  @ViewChild('video',{static:false}) video: ElementRef;
  @ViewChild('canvas',{static:false}) canvas: ElementRef;
  loading: HTMLIonLoadingElement;

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
    public toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private barcodeScanner: BarcodeScanner, 

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

    this.videoElement = this.video.nativeElement;
    this.canvasElement = this.canvas.nativeElement;
    this.canvasContext = this.canvasElement.getContext('2d');

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

  ngOnInit() {
  }

  captar(){
    this.barcodeScanner.scan().then(barcodeData => {
      this.code = barcodeData.text;
      console.log('Barcode data', barcodeData);
    }).catch(err => {
        console.log('Error', err);
    });
  }

  async starscan(){
    const stream = await navigator.mediaDevices.getUserMedia({
      video: {facingMode: 'environment'}
    });
    this.videoElement.srcObject = stream;
    this.videoElement.setAttribute('playsinline',true);
    this.videoElement.play();
    this.loading = await this.loadingCtrl.create({});
    await this.loading.present();
    requestAnimationFrame(this.scan.bind(this));
  }

  async scan(){
    console.log('SCAN');
    if(this.videoElement.readyState === this.videoElement.HAVE_ENOUGH_DATA){
      if(this.loading){
        await this.loading.dismiss();
        this.loading = null;
        this.scanActive = true;
      }
      this.canvasElement.height = this.videoElement.videoHeight;
      this.canvasElement.width = this.videoElement.videoWidth;
      this.canvasContext.drawImage(
        this.videoElement,
        0,
        0,
        this.canvasElement.width,
        this.canvasElement.height
      );
      const imageData = this.canvasContext.getImageData(
        0,
        0,
        this.canvasElement.width,
        this.canvasElement.height
      );
      const code = jsQR(imageData.data, imageData.width,imageData.height,{
        inversionAttempts: 'dontInvert'
      });
      console.log('code: ',code);
      if(code){
        this.scanActive = false;
        this.scanResult = code.data;
        this.showQrToast();
      }else{
        if(this.scanActive){
        requestAnimationFrame(this.scan.bind(this));
        }
      }
    }else{
      requestAnimationFrame(this.scan.bind(this));
    }
  }
  reset(){
    this.scanResult=null;
  }
  stopscan(){
    this.scanActive = false;
  }
  
  async showQrToast(){
    const toast = await this.toastCtrl.create({
      message: `Open ${this.scanResult}?`,
      position: 'top',
      buttons:[{
        text: 'Open',
        handler: () =>{
          window.open(this.scanResult, '_system','location=yes');
        }
      }]
        });
    toast.present();
  }


}
