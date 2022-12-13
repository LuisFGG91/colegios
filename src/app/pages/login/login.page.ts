import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController, MenuController, ToastController, AlertController, LoadingController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { BackendApiProvider } from '../../providers/backend-api/backend-api.service';

/*
*/

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  private userFormGroup: FormGroup;
  public data: any;
  loading: HTMLIonLoadingElement;
  loadingBar: any;
  constructor(
    public navCtrl: NavController,
    public menuCtrl: MenuController,
    private toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    private formBuilder: FormBuilder,
    private storage: Storage,
    private backend: BackendApiProvider,
/*
*/
  ) {

    console.log('Hello AuthComponent Component');

    this.userFormGroup = this.formBuilder.group({
        "username" : ["", Validators.required],
        "password" : ["", Validators.required]

    })
    this.createLoadingBar()
  }

  ionViewWillEnter() {
    this.menuCtrl.enable(false);
  }

  async forgotPass() {
    const alert = await this.alertCtrl.create({
      header: 'Forgot Password?',
      message: 'Enter you username address to send a reset link password.',
      inputs: [
        {
          name: 'username',
          type: 'text',
          placeholder: 'username'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Confirm',
          handler: async () => {
            const loader = await this.loadingCtrl.create({
              duration: 2000
            });

            loader.present();
            loader.onWillDismiss().then(async l => {
              const toast = await this.toastCtrl.create({

                message: 'Email was sended successfully.',
                duration: 3000,
                position: 'bottom',
                buttons: [
                  {
                    text: 'Done',
                    role: 'cancel',
                    handler: () => {
                      console.log('Cancel clicked');
                    }
                  }
                ],
              });

              toast.present();
            });
          }
        }
      ]
    });

    await alert.present();
  }
  // // //
  goToRegister() {
    this.navCtrl.navigateRoot('/register');
  }
  goToHome(event) {
    this.navCtrl.navigateRoot('/home-results');
  }
  createLoadingBar(){
    this.loadingBar = this.loadingCtrl.create({message: "Please wait..."})
  }
  async ngOnInit() {
    this.userFormGroup = this.formBuilder.group({
      "username": [null, Validators.compose([
        Validators.required
      ])],
      "password": [null, Validators.compose([
        Validators.required
      ])]
    });
  }

  handleSubmit(event){
    console.log(this.userFormGroup.value) // to the http server
    this.doLogin(event);

  }

  doLogin(event) {
   // this.showLoader();
    console.log(this.userFormGroup.value) // to the http server

    this.backend.login(this.userFormGroup.value).then((result) => {
      this.data = result;
      console.log(this.data);
      //this.loadingBar.dismiss();
      //localStorage.setItem('token', this.data.token);
      //this.goToHome();
      //this.navCtrl.setRoot(TabsPage);
    }, (err) => {
      this.loadingBar.dismiss();
      this.presentToast(err);
    });
  }

  register() {




    //this.navCtrl.push(RegisterPage);
  }

  async showLoader(){
    this.loading = await this.loadingCtrl.create({message: "Please wait..."});
    await this.loading.present();
  }

  async presentToast(msg) {

    const toast = await this.toastCtrl.create({
      message: msg ,
      duration: 3000,
      position: 'bottom',
        });

    toast.present();
  }



}
