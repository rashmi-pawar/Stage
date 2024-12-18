import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UtilProvider } from '../../providers/util/util';
import { Storage } from "@ionic/storage";
import { User } from "../../providers";
import * as moment from 'moment';


@IonicPage()
@Component({
  selector: 'page-event-detail',
  templateUrl: 'event-detail.html',
})
export class EventDetailPage {
  eventData: any;
  checkedIdx : any;
  totalVal: any=0;
  eventdiscount_value: number=0;
  distotalVal: any;
  userData: any;
  generalNumOfTickets: number = 1;
  businessNumOfTickets: number = 1;
  goldNumOfTickets: number = 1;
  silverNumOfTickets: number = 1;
  curDate: string;
  eventDataPost: any = {};
  no_of_ticket: any='';
  grandTotal: number=0;
  gTotalVal: number =0 ;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public storage: Storage,
    public util: UtilProvider,
    public user: User, ) {
    this.eventData = navParams.data.event;
    console.log(this.eventData);
    this.curDate = moment().format("YYYY-MM-DD");
    // console.log(this.curDate);
    // this.eventData = {"id":"12","user_id":"20","event_name":"test","description":"test","event_time":"test","event_location":"tesr","start_date":"2021-01-14","end_date":"2021-01-17","gold_ticket_price":"700.00","silver_ticket_price":"900.00","general_ticket_price":"98.00","business_ticket_price":"76.00","first_name":"test","last_name":"test","mobile":"92250096","email":"colddark829@gmail.com","discount_code":"0","discount_value":"0","no_of_ticket_sale":"","attachment":"","status":"1","create_dt":"1610603748","update_dt":"1610603748"}
    // this.totalVal = this.eventData.gold_ticket_price;
    this.distotalVal = this.eventData.discount_value;
    // this.eventdiscount_value = this.totalVal - this.distotalVal;
    this.storage.get('userData').then(userData => {
      this.userData = JSON.parse(userData);
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EventDetailPage');
  }

  back() {
    this.navCtrl.pop();
  }

  book() {
    if (this.checkedIdx == 0) {
      this.totalVal = this.eventData.general_ticket_price;
    }
    if (this.checkedIdx == 1) {
      this.totalVal = this.eventData.business_ticket_price;
    }
    if (this.checkedIdx == 2) {
      this.totalVal = this.eventData.gold_ticket_price;
    }
    if (this.checkedIdx == 3) {
      this.totalVal = this.eventData.silver_ticket_price;
    }
    if (this.checkedIdx == undefined || this.checkedIdx == -1) {
      this.util.presentToast('Please Select Ticket');
    }
    if (this.no_of_ticket == '') {
      this.util.presentToast('Please enter no. of ticket you want to book');
    }
    else {
      this.grandTotal = this.totalVal*this.no_of_ticket;
      this.util.presentLoader();
      this.eventDataPost = {
        "event_id": this.eventData.id,
        "event_type": "0",
        "amount": this.grandTotal,
        "discount_code": this.eventData.discount_code,
        "discount_value": this.eventData.discount_value,
        "booking_type": 'Event',
        "no_of_ticket": this.no_of_ticket
      }
      // this.user.bookEvent(data, this.userData.Authorization).subscribe(res => {
      //   let response: any = res;
      //   if (response.status) {
      //     this.util.dismissLoader();
      //     this.navCtrl.push('TicketPage', { detail: res });
      //     this.util.presentAlert('', response.message);
      //   }
      //   setTimeout(() => {
      //     this.util.dismissLoader();
      //   }, 500);
      // }, error => {
      //   console.error(error);
      //   this.util.dismissLoader();
      // });

          this.navCtrl.push('PaymentPage', { detail: this.eventDataPost });

          this.util.dismissLoader();
    }
  }
  getdata(item:any) {
    this.totalVal = item;
    // console.log(this.checkedIdx);
    localStorage.setItem('realvalue', this.totalVal);
    this.eventdiscount_value = item - this.distotalVal;
  }

  decreaseGeneral() {
    if (this.generalNumOfTickets !==0){
      this.generalNumOfTickets--;
    }
  }
  increaseGeneral() {
    if (this.generalNumOfTickets !== 99){
      this.generalNumOfTickets++;
    }
  }

  decreaseBusiness() {
    if (this.businessNumOfTickets !==0){
      this.businessNumOfTickets--;
    }
  }
  increaseBusiness() {
    if (this.businessNumOfTickets !== 99){
      this.businessNumOfTickets++;
    }
  }

  decreaseGold() {
    if (this.goldNumOfTickets !==0){
      this.goldNumOfTickets--;
    }
  }
  increaseGold() {
    if (this.goldNumOfTickets !== 99){
      this.goldNumOfTickets++;
    }
  }

  decreaseSilver() {
    if (this.silverNumOfTickets !==0){
      this.silverNumOfTickets--;
    }
  }
  increaseSilver() {
    if (this.silverNumOfTickets !== 99){
      this.silverNumOfTickets++;
    }
  }
  onChangeQuantity(){
  //  console.log(item);
  //  console.log(this.no_of_ticket);
   this.totalVal = localStorage.getItem('realvalue')
   this.totalVal = (this.no_of_ticket) * this.totalVal;
   this.eventdiscount_value = this.totalVal  - this.distotalVal;
  }
}
