import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController, MenuController, LoadingController } from '@ionic/angular';
import { StorageService } from '../../providers/storage/storage.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  public onRegisterForm: FormGroup;

  constructor(
    public navCtrl: NavController,
    public menuCtrl: MenuController,
    public loadingCtrl: LoadingController,
    private formBuilder: FormBuilder,
    private storageService: StorageService
  ) { }

  ionViewWillEnter() {
    this.menuCtrl.enable(false);
  }

  ngOnInit() {
    this.onRegisterForm = this.formBuilder.group({
      'fullName': [null, Validators.compose([
        Validators.required
      ])],
      'email': [null, Validators.compose([
        Validators.required
      ])],
      'password': [null, Validators.compose([
        Validators.required
      ])]
    });
  }

  async signUp() {
    const loader = await this.loadingCtrl.create({
      duration: 2000
    });

    loader.present();
    loader.onWillDismiss().then(() => {
      this.navCtrl.navigateRoot('/home-results');
    });
  }

  // // //
  goToLogin() {
    this.navCtrl.navigateRoot('/');
  }
  async register(){


    this.storageService.set('user_name', 'Shadman').then(result => {
      console.log('Data is saved');
      }).catch(e => {
      console.log("error: " + e);
      });

    this.storageService.get('user_name').then(result => {
        if (result != null) {
        console.log('Username: '+ result);
        }
        }).catch(e => {
        console.log('error: '+ e);
        // Handle errors here
        });
    this.storageService.setObject('person', {name : 'Shadman', age : 26});

    this.storageService.getObject('person').then(result => {
          if (result != null) {
          console.log('Person: '+ result);
          }
          }).catch(e => {
          console.log('error: ', e);
          });
    //this.storageService.remove('user_name');
    //this.storageService.clear();
      }

}
