import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-freelancer-detail',
  templateUrl: 'freelancer-detail.html',
})
export class FreelancerDetailPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
  }

  back() {
    this.navCtrl.pop();
  }

  openCart() {
    this.navCtrl.push('CartListPage');
  }

  openPayment() {
    this.navCtrl.push('PaymentPage');
  }
}
