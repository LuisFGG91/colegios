import { Component } from '@angular/core';
import { Pages } from './interfaces/pages';

import { SplashScreen } from '@awesome-cordova-plugins/splash-screen/ngx';
import { StatusBar } from '@awesome-cordova-plugins/status-bar/ngx';

import { Platform, NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  public appPages: Array<Pages>;

  constructor(
    private platform: Platform,
    public navCtrl: NavController,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private storage: Storage,
    
  ) {
    
    this.appPages = [
      {
        title: 'Home',
        url: '/home-results',
        direct: 'root',
        icon: 'home'
      },
      {
        title: 'Actividad',
        url: '/actividad',
        direct: 'forward',
        icon: 'walk-outline'
      },
      {
        title: 'Asistencia',
        url: '/asistencia',
        direct: 'forward',
        icon: 'bar-chart-outline'
      },
      {
        title: 'biblioteca',
        url: '/biblioteca',
        direct: 'forward',
        icon: 'library-outline'
      },
      {
        title: 'Curso',
        url: '/curso',
        direct: 'forward',
        icon: 'layers-outline'
      },
      {
        title: 'Evaluación',
        url: '/evaluacion',
        direct: 'forward',
        icon: 'checkmark-done-outline'
      },
      {
        title: 'inscripción',
        url: '/incripciones',
        direct: 'forward',
        icon: 'book-outline'
      },
      {
        title: 'materia',
        url: '/materia',
        direct: 'forward',
        icon: 'albums-outline'
      },
      {
        title: 'about',
        url: '/about',
        direct: 'forward',
        icon: 'information-circle-sharp'
      },

      {
        title: 'App Settings',
        url: '/settings',
        direct: 'forward',
        icon: 'cog'
      },
    ];
    this.initializeApp();
    this.inonot();
  }
  initializeApp() {

      this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    }).catch(() => {});
  }
  async inonot(){
    await this.storage.create();
  }
  goToEditProgile() {
    this.navCtrl.navigateForward('edit-profile');
  }

  logout() {
    this.navCtrl.navigateRoot('/');
  }

}
