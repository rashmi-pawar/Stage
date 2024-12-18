import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { User } from "../../providers";
import { App } from "ionic-angular/index";
import { UtilProvider } from "../../providers/util/util";
import { Storage } from "@ionic/storage";
import { Refresher } from "ionic-angular/index";

@IonicPage()
@Component({
  selector: 'page-all-event-booked',
  templateUrl: 'all-event-booked.html',
})
export class AllEventBookedPage {

  projectList: any = [];
  pageNumber: any = 1;
  pageSize: any = 10;
  isListEmpty: boolean = false;
  allproject: any;
  pet: any;
  eventID: any;
  constructor(public navCtrl: NavController,
    public user: User,
    public util: UtilProvider,
    public app: App,
    public storage: Storage,
    public navParams: NavParams) {
    this.eventID = navParams.data.eventID;
    this.pet = 'Event';
  }

  ionViewDidLoad() {
    this.getAllSpace(true).then(data => {
      this.projectList = data;
      (this.projectList.length > 0) ? this.isListEmpty = false : this.isListEmpty = true;
    }).catch(err => {
      (this.projectList.length > 0) ? this.isListEmpty = false : this.isListEmpty = true;
    });
  }

  getAllSpace(showLoader) {
    // console.log(changeValueData)
    this.projectList = [];
    return new Promise((resolve, reject) => {
      this.storage.get('userData').then(userData => {
        let user: any = JSON.parse(userData);
        let data = {
          "event_id": this.eventID
        }
        if (showLoader) {
          this.util.presentLoader();
        }
        this.user.userEventBookingList(data, user.Authorization).subscribe(res => {
          let resp: any = res;
          console.log('myBooking', resp);
          if (resp.status) {
            resolve(resp.data)
            this.pageNumber++;
          } else {
            reject('');
          }
          if (showLoader) {
            setTimeout(() => {
              this.util.dismissLoader();
            }, 500);
          }
        }, error => {
          console.error(error);
          reject(error);
          this.util.dismissLoader();
        });
      })
    })
  }
  getAllData(item: any) {
    this.navCtrl.push('AllBookingPage', { detail: item });
  }
  openNotification() {
    this.navCtrl.push('NotificationPage');
  }
}
