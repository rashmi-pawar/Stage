import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from "@ionic/storage";
import { FirebaseProvider } from "../../providers/firebase/firebase";
import { User } from "../../providers";
import { UtilProvider } from "../../providers/util/util";


@IonicPage()
@Component({
  selector: 'page-view-project',
  templateUrl: 'view-project.html',
})
export class ViewProjectPage {
  viewdetail: any;
  userData: any = {}
  userHiredBooked: any;
  userHired: any;
  isHiringData: string = 'false';
  constructor(public navCtrl: NavController,
    public storage: Storage,
    public util: UtilProvider,
    public user: User,
    public fireDb: FirebaseProvider,
    public navParams: NavParams) {
    this.viewdetail = navParams.data.detail;
    localStorage.setItem('isHiringStorage', 'false')
    console.log(this.viewdetail);
  }

  ionViewDidLoad() {
    this.storage.get('userData').then(userData => {
      this.userData = JSON.parse(userData);
      console.log('this.userData', this.userData)
      this.checkUser();
    })
  }
  checkUser() {
    let data = {
      "user_id": this.viewdetail.user_id,
      "project_id": this.viewdetail.id
    }
    console.log('resp data', data);
    this.util.presentLoader();
    this.user.checkUserHire(data, this.userData.Authorization).subscribe(res => {
      let resp: any = res;
      this.userHired = resp.message;
      console.log('checkUserHire', resp);
      this.util.dismissLoader();
    }, error => {
      console.error(error);
      this.util.dismissLoader();
    })
    this.user.checkUserHireBooked(data, this.userData.Authorization).subscribe(res => {
      let resp: any = res;
      this.userHiredBooked = resp.message;
      console.log('checkUserHireBooked', resp);
      this.util.dismissLoader();
    }, error => {
      console.error(error);
      this.util.dismissLoader();
    })
  }

  back() {
    this.navCtrl.pop();
  }

  accept() {
    let data = {
      project_id: this.viewdetail.id
    }
    this.util.presentLoader();
    this.user.acceptProject(data, this.userData.Authorization).subscribe(res => {
      let resp: any = res;
      this.util.dismissLoader();
      this.util.presentAlert('', resp.message);
      // this.navCtrl.pop();

      localStorage.setItem('isHiringStorage', 'true')
      this.storage.get('userData').then(userData => {
        this.userData = JSON.parse(userData);
        console.log('this.userData', this.userData)
        this.checkUser();
      })
      this.isHiringData = localStorage.getItem('isHiringStorage')
      // let user = {
      //   date_of_join: new Date().getTime(),
      //   id: this.viewdetail.user_id,
      //   image: this.viewdetail.profile_pic,
      //   name: this.viewdetail.first_name !== '' ? this.viewdetail.first_name + ' ' + this.viewdetail.last_name : this.viewdetail.email,
      //   roomId: 'StageChatRoom_' + (Math.floor(Math.random() * 10000) + 1)
      // }
      // this.fireDb.addUser(user, this.userData.id);
      // this.navCtrl.push('InboxPage');
    }, error => {
      console.error(error);
      this.util.dismissLoader();
    })
  }
  chat() {
    let user = {
      date_of_join: new Date().getTime(),
      id: this.viewdetail.user_id,
      image: this.viewdetail.profile_pic,
      name: this.viewdetail.first_name !== '' ? this.viewdetail.first_name + ' ' + this.viewdetail.last_name : this.viewdetail.email,
      roomId: 'StageChatRoom_' + (Math.floor(Math.random() * 10000) + 1)
    }
    this.fireDb.addUser(user, this.userData.id);
    this.navCtrl.push('InboxPage');
  }
  payNow(viewdetail) {
    let eventDataPost = {
      "project_id": viewdetail.id,
      "event_type": "0",
      "profile_pic": viewdetail.profile_pic,
      "first_name": viewdetail.first_name,
      "last_name": viewdetail.last_name,
      "email": viewdetail.email,
      "amount": viewdetail.price,
      "booking_type": 'Project',
      "user_id": viewdetail.user_id,
    }

    this.navCtrl.push('PaymentPage', { detail: eventDataPost });
  }
}
