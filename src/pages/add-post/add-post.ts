import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-add-post',
  templateUrl: 'add-post.html',
})
export class AddPostPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
  }

  openAddEvents() {
    this.navCtrl.push('AddEventPage');
  }

  openAddSpace() {
    this.navCtrl.push('AddSpacePage');
  }

  openAddEquipment() {
    this.navCtrl.push('AddEquipmentPage');
  }
}
