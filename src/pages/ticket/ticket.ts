import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from "@ionic/storage";

@IonicPage()
@Component({
  selector: 'page-ticket',
  templateUrl: 'ticket.html',
})
export class TicketPage {

  type:any = 'event'
  banner : any = 'assets/img/banner.png'
  spaceData: any;
  spacedatago: any;
  detailData: any;
  ticketdata: any;
  bookingtype: any;
  ticketdataextra: any;
  booking_ref: any;
  constructor(public navCtrl: NavController,
     public storage: Storage,
     public navParams: NavParams) {
    // this.type = navParams.data.type;
    this.detailData = navParams.data.detail;
    this.bookingtype = this.detailData.data.booking_type;
    if(this.bookingtype=='Space'){
      this.ticketdata = this.detailData.data.sapce_info[0];
      this.booking_ref = this.detailData.data.booking_ref
    }
    if(this.bookingtype=='Equipment'){
      this.ticketdata = this.detailData.data.equipment_info[0];
      this.booking_ref = this.detailData.data.booking_ref
    }
    if(this.bookingtype=='Event'){
      this.ticketdata = this.detailData.data.event_info[0];
      this.ticketdataextra = this.detailData.data;
      this.booking_ref = this.detailData.data.booking_ref
    }
    this.type = 'space';
    // this.storage.get('spaceDetail').then(spaceDetail => {
    //   this.spaceData = JSON.parse(spaceDetail);
    //   this.spacedatago =this.spaceData.data.sapce_info[0];
    //   console.log(this.spacedatago.space_name);
    // })
    this.setupTicket();
  }

  ionViewDidLoad() {
  }

  back() {
    this.navCtrl.setRoot('HomePage');
  }

  setupTicket() {
    switch (this.bookingtype){
      case 'Event': this.setEventTicket()
        break;
      case 'Equipment': this.setEquimentTicket()
        break;
      case 'Space': this.setSpaceTicket();
        break;
    }
  }

  setEventTicket() {
    this.banner = 'assets/img/banner.png';
  }
  setEquimentTicket() {
    this.banner = 'assets/img/equipment-banner.png';
  }
  setSpaceTicket() {
    this.banner = 'assets/img/rent-banner.png';
  }
}
