import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {User} from "../../providers";
import {UtilProvider} from "../../providers/util/util";
import {Storage} from "@ionic/storage";
import  moment from "moment";


@IonicPage()
@Component({
  selector: 'page-add-event',
  templateUrl: 'add-event.html',
})
export class AddEventPage {
  startDate: String = new Date().toISOString();
  endDate: String = new Date().toISOString();
  event:any = {
    event_name:'',
    description:'',
    start_date:'',
    end_date:'',
    event_time:'',
    gold_ticket_price:'',
    silver_ticket_price:'',
    general_ticket_price:'',
    business_ticket_price:'',
    first_name:'',
    last_name:'',
    email:'',
    mobile:'',
    discount_code:'',
    no_of_ticket_sale:'',
    attachment:'',
    event_location:''
  }
  attachmentToShow: any = '';
  userData: any = {};
  constructor(public navCtrl: NavController,
              public user:User,
              public util:UtilProvider,
              public storage:Storage,
              public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.getUserData();
  }

  postEvent() {
    if (this.validate()){
      let formData = new FormData();

    if (this.event.first_name.trim() === ''){
      // this.util.presentToast('Please enter last name');
      // this.event.first_name = 'h';
      // return false;
    }
    if (this.event.last_name.trim() === ''){
      // this.util.presentToast('Please enter last name');
      // this.event.last_name = 'h';
      // return false;
    }
    if(this.event.no_of_ticket_sale=='' || this.event.no_of_ticket_sale==undefined){
      this.util.presentToast('Please enter no of tickets');
      return false;
    }
      formData.append('event_name',this.event.event_name);
      formData.append('description',this.event.description);
      formData.append('start_date',this.event.start_date);
      formData.append('end_date',this.event.end_date);
      formData.append('event_time',this.event.event_time);
      formData.append('gold_ticket_price',this.event.gold_ticket_price);
      formData.append('silver_ticket_price',this.event.silver_ticket_price);
      formData.append('general_ticket_price',this.event.general_ticket_price);
      formData.append('business_ticket_price',this.event.business_ticket_price);
      formData.append('first_name',this.event.first_name);
      formData.append('last_name',this.event.last_name);
      formData.append('email',this.event.email);
      formData.append('mobile',this.event.mobile);
      formData.append('discount_code',this.event.discount_code);
      formData.append('no_of_ticket_sale',this.event.no_of_ticket_sale);
      formData.append('attachment',this.event.attachment);
      formData.append('event_location',this.event.event_location);

      this.util.presentLoader();
      this.user.addEventData(formData,this.userData.Authorization).subscribe(res=>{
        let resp : any =res;
        console.log(resp);
        if (resp.status){
          this.util.presentAlert('',resp.message);
          this.event = {
            event_name:'',
            description:'',
            start_date:'',
            end_date:'',
            event_time:'',
            gold_ticket_price:'',
            silver_ticket_price:'',
            general_ticket_price:'',
            business_ticket_price:'',
            first_name:'',
            last_name:'',
            email:'',
            mobile:'',
            discount_code:'',
            no_of_ticket_sale:'',
            attachment:'',
            event_location:''
          }
          this.attachmentToShow='';
          this.navCtrl.popToRoot();
        }
        setTimeout(()=>{
          this.util.dismissLoader();
        },500);
      },error => {
        console.error(error);
        this.util.dismissLoader();
      });
    }
  }

  private validate() {
    var mydate=moment().format('YYYY-MM-DD');
    // console.log(mydate);
    if (this.event.event_name.trim() === ''){
      this.util.presentToast('Please enter event name');
      return false;
    }
    if (this.event.event_location.trim() === ''){
      this.util.presentToast('Please enter event location');
      return false;
    }
    if (this.event.start_date.trim() === ''){
      this.util.presentToast('Please enter event start date');
      return false;
    }
    if (this.event.end_date.trim() === ''){
      this.util.presentToast('Please enter event end date');
      return false;
    }
    if (this.event.start_date.trim() > this.event.end_date.trim()){
      this.util.presentToast('Wrong Start and End date');
      return false;
    }
    if (this.event.event_time.trim() === ''){
      this.util.presentToast('Please enter event time');
      return false;
    }
    if (this.event.gold_ticket_price === ''){
      this.util.presentToast('Please enter gold ticket price name');
      return false;
    }
    if (this.event.email.trim() === ''){
      this.util.presentToast('Please enter email');
      return false;
    }

    return true;
  }

  private getUserData() {
    this.storage.get('userData').then(userData=> {
      this.userData = JSON.parse(userData);
    })
  }
  getAttachmentEvent(event) {
    this.event.attachment = event.target.files[0];
    let reader = new FileReader();
    let that = this;
    reader.onload = function(){
      that.attachmentToShow = reader.result;
    };
    reader.readAsDataURL(event.target.files[0]);
  };
}
