import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { Storage } from "@ionic/storage";
import { User } from "../../providers";
import { UtilProvider } from "../../providers/util/util";
import { App } from "ionic-angular/index";

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  segmentProfile: any = 'profile';
  isReviewSelected: boolean = false;
  userData: any = {};
  showArrow: any;
  testlen: any;
  showMore: false;
  showlimit: 100;
  show: string;
  reviewData: any = [];
  isReviewEmpty: boolean = false;
  portfolioData: any = [];
  isPortfolioEmpty: boolean = false;
  response_rate: number = 0;
  totalresponse: number = 0;
  order_complition: number = 0;
  ontime_delivery: number = 0;
  positive_rating: number = 0;
  totalorder_complition: number = 0;
  totalontime_delivery: number = 0;
  totalpositive_rating: number = 0;
  profileData: any;
  isPortfolioImageEmpty: boolean = false;
  constructor(public navCtrl: NavController,
    public storage: Storage,
    public user: User,
    public app: App,
    public util: UtilProvider,
    public viewCtrl: ViewController,
    public navParams: NavParams) {
    this.showArrow = navParams.data.detail;
    this.show = 'yes';
    this.showlimit = 100;
  }

  ionViewDidLoad() {
    this.storeDataInLocal();
  }
  ionViewWillEnter() {
    this.getMyProfileData();
  }
  selectSegment(data) {
    this.isReviewSelected = data;
  }

  editProfile() {
    this.navCtrl.push('EditProfilePage');
  }

  storeDataInLocal() {
    this.storage.get('userData').then(userData => {
      this.userData = JSON.parse(userData);
      this.testlen = this.userData.about.length;
    })
  }
  showMorego() {
    this.show = 'no';
    this.showlimit = this.testlen;
  }
  showLessgo() {
    this.show = 'yes';
    this.showlimit = 100;
  }
  back() {
    this.viewCtrl.dismiss();
  }
  trimString(string, length) {
    return string.length > length ?
      string.substring(0, length) + '...' :
      string;
  }

  getMyProfileData() {
    this.storage.get('userData').then(userData => {
      this.userData = JSON.parse(userData);
      let data = {
        "user_id": this.userData.id
      }
      this.user.getProfileData(data, this.userData.Authorization).subscribe(res => {
        let resp: any = res;
        console.log(resp);
        if (resp.status) {
          this.reviewData = resp.data.review_data;
          this.reviewData.forEach(item => {
            this.response_rate += Number(item.response_rate);
            this.order_complition += Number(item.order_complition);
            this.ontime_delivery += Number(item.ontime_delivery);
            this.positive_rating += Number(item.positive_rating);
          });
          this.totalresponse = (this.response_rate / this.reviewData.length);
          this.totalorder_complition = (this.order_complition / this.reviewData.length);
          this.totalontime_delivery = (this.ontime_delivery / this.reviewData.length);
          this.totalpositive_rating = (this.positive_rating / this.reviewData.length);
          this.portfolioData = resp.data.portfolio_data;
          this.profileData = resp.data.profile_data.portfolio_image;
          console.log('profileData', this.profileData);
          this.storage.set('userData', JSON.stringify(resp.data.profile_data));
        }
        this.profileData.length > 0 ? this.isPortfolioImageEmpty = false : this.isPortfolioImageEmpty = true;
        this.reviewData.length > 0 ? this.isReviewEmpty = false : this.isReviewEmpty = true;
        this.portfolioData.length > 0 ? this.isPortfolioEmpty = false : this.isPortfolioEmpty = true;
        setTimeout(() => {
          this.util.dismissLoader();
        }, 500);
      }, error => {
        console.error(error);
        this.util.dismissLoader();
        this.portfolioData.length > 0 ? this.isPortfolioEmpty = false : this.isPortfolioEmpty = true;
        this.reviewData.length > 0 ? this.isReviewEmpty = false : this.isReviewEmpty = true;
      });
    });
  }
  goProjectInner(item: any, mystatus: any) {
    if (item == 'Project') {
      this.app.getRootNav().push('ProjectInnerPage', { status: mystatus });
      localStorage.setItem("showComplete", "show");
    }
    if (item == 'Event') {
      this.app.getRootNav().push('EventCompletePage', { event: mystatus });
    }
    if (item == 'Equipment') {
      this.app.getRootNav().push('EquipmentDetailPage', { equip: mystatus });
      localStorage.setItem("showComplete", "show");
    }
    if (item == 'Space') {
      this.app.getRootNav().push('SpaceDetailPage', { space: mystatus });
      localStorage.setItem("showComplete", "show");
    }
  }
  closeDelete(item: any) {
    this.storage.get('userData').then(userData => {
      let user: any = JSON.parse(userData);
      this.util.presentLoader();
      let data = {
        "portfolio_image": item
      }
      this.user.removePortfolio(data, user.Authorization).subscribe(res => {
        let resp: any = res;
        // console.log(resp);
        if (resp.status) {
          this.profileData = resp.data.portfolio_image;
          this.profileData.length > 0 ? this.isPortfolioImageEmpty = false : this.isPortfolioImageEmpty = true;
        }
        this.util.dismissLoader();
      }, error => {
        console.error(error);
      });
    })
  }
}
