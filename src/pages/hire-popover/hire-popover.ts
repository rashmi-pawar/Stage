import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { Storage } from "@ionic/storage";
import { User } from "../../providers";
import { UtilProvider } from "../../providers/util/util";
import { App } from "ionic-angular/index";
import { FirebaseProvider } from "../../providers/firebase/firebase";


@IonicPage()
@Component({
  template: `
    <ion-list>
      <button ion-item (click)="hire()">Hire</button>
      <button ion-item (click)="notification()">Notofication</button>
    </ion-list>
  `
})
export class HirePopoverPage {
  userData: any;
  hireDetail: any =[];
  projectId: any;
  detail: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public storage: Storage,public viewCtrl: ViewController,
    public user: User,
    public fireDb: FirebaseProvider,
    public app: App,
    public util: UtilProvider,) {
    this.detail = navParams.data.detail;
    // console.log(this.detail.id);
    // console.log(this.detail.project_id);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HirePopoverPage');
  }
  hire() {
    this.util.presentLoader();
    this.storage.get('userData').then(userData => {
      this.userData = JSON.parse(userData);
      let data = {
        "user_id": this.detail.id,
        'project_id': this.detail.project_id
      }
      this.user.userHire(data, this.userData.Authorization).subscribe(res => {
        let resp: any = res;
        // console.log(resp);
        this.util.presentAlert('', resp.message);
        if (resp.status) {
        }
        setTimeout(() => {
          this.util.dismissLoader();
        }, 500);
      }, error => {
        console.error(error);
        this.util.dismissLoader();
      });
    });
    this.viewCtrl.dismiss();
  }
  notification() {
    this.navCtrl.push('NotificationPage');
  }
}
