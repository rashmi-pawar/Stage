import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from "@ionic/storage";
import { User } from "../../providers";
import { UtilProvider } from "../../providers/util/util";

@IonicPage()
@Component({
  selector: 'page-equipment-detail',
  templateUrl: 'equipment-detail.html',
})
export class EquipmentDetailPage {

  equipDetail: any = {};
  userData: any;
  realamount: any;
  checkedIdx :any;
  isComplete: string;
  equipmentData:any= {};
  constructor(public navCtrl: NavController,
    public util: UtilProvider,
    public navParams: NavParams,
    public user: User,
    public storage: Storage, ) {
    this.equipDetail = navParams.data.equip;
    this.isComplete = localStorage.getItem("showComplete");
    localStorage.setItem("showComplete","");
    this.realamount = this.equipDetail.rate_per_day;
    this.storage.get('userData').then(userData => {
      this.userData = JSON.parse(userData);
    })
  }

  ionViewDidLoad() {
  }

  book() {
    // console.log(this.checkedIdx );
    if (this.checkedIdx == undefined || this.checkedIdx == -1) {
      this.util.presentToast('Please Select Equipment Rate');
    }
    else {
      // this.util.presentLoader();
       this.equipmentData = {
        'equipment_id': this.equipDetail.id,
        'amount': this.realamount,
        "booking_type": 'Equipment'
      }
      // this.user.BookEquipment(data, this.userData.Authorization).subscribe(res => {
      //   let response: any = res;
      //   if (response.status) {
      //     //  this.navCtrl.push('TicketPage',{type:'equipment'});
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
          this.navCtrl.push('PaymentPage', { detail: this.equipmentData });
    }
  }
  godata(item:any) {
    this.realamount = item;
  }
  back() {
    this.navCtrl.pop();
  }
}
