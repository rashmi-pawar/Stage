import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-event-complete',
  templateUrl: 'event-complete.html',
})
export class EventCompletePage {

  eventDetails: any = {};

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.eventDetails = navParams.data.event;
    console.log(this.eventDetails);
  }

  ionViewDidLoad() {

  }
  viewAllDetail(event) {
    console.log('event', event);
    this.navCtrl.push('AllEventBookedPage', { eventID: event.id })
  }
  back() {
    this.navCtrl.pop();
  }
}
