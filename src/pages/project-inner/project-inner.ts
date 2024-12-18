import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UtilProvider } from '../../providers/util/util';
import { Storage } from "@ionic/storage";
import { User } from "../../providers";

@IonicPage()
@Component({
  selector: 'page-project-inner',
  templateUrl: 'project-inner.html',
})
export class ProjectInnerPage {
  isCompleted: boolean = true;
  status: any = '';
  rating: any;
  review: any;
  userData: any;
  FAQlist: any = [];
  reviewList: any = [];
  isFAQEmpty: boolean = false;
  isComplete: any;
  response_rate: any;
  order_complition: any;
  ontime_delivery: any;
  positive_rating: any;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public storage: Storage,
    public util: UtilProvider, public user: User) {
    this.status = navParams.data.status;
    this.isComplete = localStorage.getItem("showComplete");
    localStorage.setItem("showComplete", "");
    this.status.status == 'In Progress' ? this.isCompleted = false : this.isCompleted = true;
    this.storage.get('userData').then(userData => {
      this.userData = JSON.parse(userData);
    })
  }
  logRatingChange() {
    if (this.validate()) {
      this.util.presentLoader();
      let data = {
        "project_id": this.status.id,
        "rating": this.rating,
        "comment": this.review,
        "response_rate": this.response_rate,
        "order_complition": this.order_complition,
        "ontime_delivery": this.ontime_delivery,
        "positive_rating": this.positive_rating
      }
      this.user.addReview(data, this.userData.Authorization).subscribe(res => {
        let response: any = res;
        this.util.dismissLoader();
        // this.navCtrl.push('TicketPage', { detail: res });
        this.util.presentAlert('', response.message);
        this.getallData();

      }, error => {
        console.error(error);
        this.util.dismissLoader();
      });
    }
  }
  ionViewDidLoad() {
    this.getallData();
  }
  validate() {
    if (this.rating == undefined || this.rating == '') {
      this.util.presentToast('Please Select Rating');
      return false;
    }
    if (this.response_rate == undefined || this.response_rate == '') {
      this.util.presentToast('Please Enter Response Rate');
      return false;
    }
    if (this.order_complition == undefined || this.order_complition == '') {
      this.util.presentToast('Please Enter Order Completion Rate');
      return false;
    }
    if (this.ontime_delivery == undefined || this.ontime_delivery == '') {
      this.util.presentToast('Please Enter On-Time Delivery Rate');
      return false;
    }
    if (this.positive_rating == undefined || this.positive_rating == '') {
      this.util.presentToast('Please Enter Positive Rating');
      return false;
    }
    if (this.review == undefined || this.review == '') {
      this.util.presentToast('Please Enter Review');
      return false;
    }
    return true;
  }
  back() {
    this.navCtrl.pop();
  }
  getallData() {
    this.storage.get('userData').then(userData => {
      let user: any = JSON.parse(userData);
      this.util.presentLoader();
      this.user.faqlist(user.Authorization).subscribe(res => {
        let resp: any = res;
        if (resp.status) {
          this.FAQlist = resp.data;
        }
        this.util.dismissLoader();
        this.FAQlist.length && this.FAQlist.length > 0 ? this.isFAQEmpty = false : this.isFAQEmpty = true;
      }, error => {
        console.error(error);
        this.FAQlist.length && this.FAQlist.length > 0 ? this.isFAQEmpty = false : this.isFAQEmpty = true;
      });
      let data = {
        "project_id": this.status.id
      }
      this.user.getReview(data, user.Authorization).subscribe(res => {
        let resp: any = res;
        if (resp.status) {
          this.reviewList = resp.data;
        }
        this.util.dismissLoader();
      }, error => {
        console.error(error);
      });
    })
  }
  cancleProject() {
    this.storage.get('userData').then(userData => {
      let user: any = JSON.parse(userData);
      this.util.presentLoader();
      let data = {
        "project_id": this.status.id
      }
      this.user.cancleProject(data, user.Authorization).subscribe(res => {
        let resp: any = res;
        if (resp.status) {
          this.navCtrl.setRoot('MenuPage');
        }
        this.util.presentToast(resp.message);
        this.util.dismissLoader();
      }, error => {
        console.error(error);
      });
    })
  }
  completeProject() {
    this.storage.get('userData').then(userData => {
      let user: any = JSON.parse(userData);
      this.util.presentLoader();
      let data = {
        "project_id": this.status.id
      }
      this.user.completeProjectStatus(data, user.Authorization).subscribe(res => {
        let resp: any = res;
        if (resp.status) {
          this.navCtrl.setRoot('MenuPage');
        }
        this.util.presentToast(resp.message);
        this.util.dismissLoader();
      }, error => {
        console.error(error);
      });
    })
  }
}
