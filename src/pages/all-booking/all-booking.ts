import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { User } from "../../providers";
import { App } from "ionic-angular/index";
import { UtilProvider } from "../../providers/util/util";
import { Storage } from "@ionic/storage";
import { Refresher } from "ionic-angular/index";

@IonicPage()
@Component({
  selector: 'page-all-booking',
  templateUrl: 'all-booking.html',
})
export class AllBookingPage {

  projectList: any = [];
  pageNumber: any = 1;
  pageSize: any = 10;
  isListEmpty: boolean = false;
  allproject: any = {};
  pet: any;
  userData: any = {};
  constructor(public navCtrl: NavController,
    public user: User,
    public util: UtilProvider,
    public app: App,
    public storage: Storage,
    public navParams: NavParams) {
    this.allproject = navParams.data.detail;
    console.log('this.allproject', this.allproject);
    this.projectList = this.allproject.ticket_data;
    this.storage.get('userData').then(userData => {
      this.userData = JSON.parse(userData);
    })
  }

  ionViewDidLoad() {
  }
  openNotification() {
    this.navCtrl.push('NotificationPage');
  }
}
