import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {User} from "../../providers";
import {UtilProvider} from "../../providers/util/util";
import {Storage} from "@ionic/storage";

@IonicPage()
@Component({
  selector: 'page-add-equipment',
  templateUrl: 'add-equipment.html',
})
export class AddEquipmentPage {
  startDate: String = new Date().toISOString();
  endDate: String = new Date().toISOString();
  equip : any = {
    equipment_name:'',
    description:'',
    rate_per_hour:'',
    rate_per_month:'',
    rate_per_day:'',
    no_of_training_days:'',
    available_from:'',
    available_to:'',
    none_available_from:'',
    none_available_to:'',
    first_name:'',
    last_name:'',
    email:'',
    mobile:'',
    attachment:'',
    equipment_location:''
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

  getAttachmentEvent(event) {
    this.equip.attachment = event.target.files[0];
    let reader = new FileReader();
    let that = this;
    reader.onload = function(){
      that.attachmentToShow = reader.result;
    };
    reader.readAsDataURL(event.target.files[0]);
  };

  validate() {
    if (this.equip.equipment_name.trim() === ''){
      this.util.presentToast('Please enter equipment name');
      return false;
    }
    if (this.equip.equipment_location.trim() === ''){
      this.util.presentToast('Please enter equipment location');
      return false;
    }
    if (this.equip.available_from.trim() === ''){
      this.util.presentToast('Please enter available from date');
      return false;
    }
    if (this.equip.available_to.trim() === ''){
      this.util.presentToast('Please enter available to date');
      return false;
    }
    if (this.equip.none_available_from.trim() === ''){
      this.util.presentToast('Please enter none available from date');
      return false;
    }
    if (this.equip.none_available_to.trim() === ''){
      this.util.presentToast('Please enter none available to date');
      return false;
    }
    if (this.equip.email.trim() === ''){
      this.util.presentToast('Please enter email');
      return false;
    }
    // if (this.equip.last_name.trim() === ''){
    //   this.util.presentToast('Please enter last name');
    //   return false;
    // }
    return true;
  }

  private getUserData() {
    this.storage.get('userData').then(userData=> {
      this.userData = JSON.parse(userData);
    })
  }

  postEquipment() {
    if (this.validate()){
      let formData = new FormData();
      formData.append('equipment_name',this.equip.equipment_name);
      formData.append('description',this.equip.description);
      formData.append('rate_per_hour',this.equip.rate_per_hour);
      formData.append('rate_per_month',this.equip.rate_per_month);
      formData.append('rate_per_day',this.equip.rate_per_day);
      formData.append('no_of_training_days',this.equip.no_of_training_days);
      formData.append('available_from',this.equip.available_from);
      formData.append('available_to',this.equip.available_to);
      formData.append('none_available_from',this.equip.none_available_from);
      formData.append('none_available_to',this.equip.none_available_to);
      formData.append('first_name',this.equip.first_name);
      formData.append('last_name',this.equip.last_name);
      formData.append('email',this.equip.email);
      formData.append('mobile',this.equip.mobile);
      formData.append('attachment',this.equip.attachment);
      formData.append('equipment_location',this.equip.equipment_location);

      this.util.presentLoader();
      this.user.addEquipmentData(formData,this.userData.Authorization).subscribe(res=>{
        let resp : any =res;
        if (resp.status){
          this.util.presentAlert('',resp.message);
          this.equip = {
            equipment_name:'',
            description:'',
            rate_per_hour:'',
            rate_per_month:'',
            rate_per_day:'',
            no_of_training_days:'',
            available_from:'',
            available_to:'',
            none_available_from:'',
            none_available_to:'',
            first_name:'',
            last_name:'',
            email:'',
            mobile:'',
            attachment:'',
            equipment_location:''
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

  openNotif() {
    this.navCtrl.push('NotificationPage');
  }
}
