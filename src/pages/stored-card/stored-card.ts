import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ViewController } from 'ionic-angular';
import { UtilProvider } from "../../providers/util/util";
import { Storage } from "@ionic/storage";
import { User } from "../../providers";



@IonicPage()
@Component({
  selector: 'page-stored-card',
  templateUrl: 'stored-card.html',
})
export class StoredCardPage {
  userData: any;
  cardDetail: any;

  constructor(public navCtrl: NavController,
    public util: UtilProvider,
    public storage: Storage,
    public user: User,
    public view:ViewController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.getAllSavedCard();
  }
  back(item:any) {
    this.view.dismiss(item);
  }
  getAllSavedCard() {
    this.storage.get('userData').then(data => {
      this.userData = JSON.parse(data);
      this.user.getSaveCardList(this.userData.Authorization).subscribe(res => {
        let resp: any = res;
        this.cardDetail = resp.data;
        console.log(resp);
        // this.util.presentToast(resp.message);
        if (resp.status) {
          setTimeout(() => {
            this.util.dismissLoader();
          }, 500)
        } else {
          // this.util.presentAlert('', resp.message);
          this.util.dismissLoader();
        }
      }, error => {
        console.error(error);
        this.util.dismissLoader();
      })
    })
  }
}
