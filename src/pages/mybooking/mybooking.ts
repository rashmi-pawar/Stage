import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { User } from "../../providers";
import { App } from "ionic-angular/index";
import { UtilProvider } from "../../providers/util/util";
import { Storage } from "@ionic/storage";
import { Refresher } from "ionic-angular/index";

@IonicPage()
@Component({
  selector: 'page-mybooking',
  templateUrl: 'mybooking.html',
})
export class MybookingPage {

  projectList: any = [];
  pageNumber: any = 1;
  pageSize: any = 10;
  isListEmpty: boolean = false;
  allproject: any;
  pet: any;
  constructor(public navCtrl: NavController,
    public user: User,
    public util: UtilProvider,
    public app: App,
    public storage: Storage,
    public navParams: NavParams) {
    // this.allproject = navParams.data.detail;
    this.pet = 'Event';
  }

  ionViewDidLoad() {
    this.getAllSpace(true, this.pet).then(data => {
      this.projectList = data;
      (this.projectList.length > 0) ? this.isListEmpty = false : this.isListEmpty = true;
    }).catch(err => {
      (this.projectList.length > 0) ? this.isListEmpty = false : this.isListEmpty = true;
    });
  }

  getAllSpace(showLoader, changeValueData) {
    // console.log(changeValueData)
    this.projectList = [];
    return new Promise((resolve, reject) => {
      this.storage.get('userData').then(userData => {
        let user: any = JSON.parse(userData);
        let data = {
          "pageNumber": "1",
          "booking_type": changeValueData
        }
        if (showLoader) {
          this.util.presentLoader();
        }
        this.user.myBooking(data, user.Authorization).subscribe(res => {
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

  loadMore(infiniteScroll) {
    setTimeout(() => {
      this.getAllSpace(false, this.pet).then((data) => {
        let list: any = data;
        this.projectList = [...this.projectList, ...list];
        (this.projectList.length > 0) ? this.isListEmpty = false : this.isListEmpty = true;
        infiniteScroll.complete();
      }).catch(() => {
        (this.projectList.length > 0) ? this.isListEmpty = false : this.isListEmpty = true;
        infiniteScroll.complete();
      })
    }, 500)
  }

  openProjectInner(status: string, item: any) {
    this.app.getRootNav().push('ProjectInnerPage', { status: status });
    if (item == 'cancle') {
      localStorage.setItem("showComplete", "show");
    } else {
      localStorage.setItem("showComplete", "");
    }
  }
  changeValue(item) {
    this.pet = item;
    this.getAllSpace(true, item).then(data => {
      this.projectList = data;
      (this.projectList.length > 0) ? this.isListEmpty = false : this.isListEmpty = true;
    }).catch(err => {
      (this.projectList.length > 0) ? this.isListEmpty = false : this.isListEmpty = true;
    });
  }
  cancleBooking(item: any, type: any) {
    this.util.presentConfirmgo('Cancel Booking', 'Are you sure want to Cancel?').then(succ => {
      return new Promise((resolve, reject) => {
        this.storage.get('userData').then(userData => {
          let user: any = JSON.parse(userData);
          let data = {
            "booking_id": item.id,
            "booking_type": type
          }
          this.util.presentLoader();
          this.user.cancleBooking(data, user.Authorization).subscribe(res => {
            let resp: any = res;
            this.getAllSpace(true, this.pet).then(data => {
              this.projectList = data;
              (this.projectList.length > 0) ? this.isListEmpty = false : this.isListEmpty = true;
            }).catch(err => {
              (this.projectList.length > 0) ? this.isListEmpty = false : this.isListEmpty = true;
            });
            if (resp.status) {
              resolve(resp.data)
              this.pageNumber++;
            } else {
              reject('');
            }
            setTimeout(() => {
              this.util.dismissLoader();
            }, 500);
          }, error => {
            console.error(error);
            reject(error);
            this.util.dismissLoader();
          });
        })
      })
    }).catch(err => { })
  }

  openNotification() {
    this.navCtrl.push('NotificationPage');
  }
  goAllBooking(item: any) {
    this.navCtrl.push('AllBookingPage', { detail: item });
  }
}
