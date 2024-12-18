import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {User} from "../../providers";
import {UtilProvider} from "../../providers/util/util";
import {Storage} from "@ionic/storage";

@IonicPage()
@Component({
  selector: 'page-add-space',
  templateUrl: 'add-space.html',
})
export class AddSpacePage {
  startDate: String = new Date().toISOString();
  space:any={
    space_name:'',
    description:'',
    start_date:'',
    end_date:'',
    area:'',
    price:'',
    first_name:'',
    last_name:'',
    email:'',
    mobile:'',
    attachment:'',
    space_location:''
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

  postSpace() {
    if (this.validate()){
      let formData = new FormData();
      formData.append('space_name',this.space.space_name);
      formData.append('description',this.space.description);
      formData.append('start_date',this.space.start_date);
      formData.append('end_date',this.space.end_date);
      formData.append('area',this.space.area);
      formData.append('price',this.space.price);
      formData.append('first_name',this.space.first_name);
      formData.append('last_name',this.space.last_name);
      formData.append('email',this.space.email);
      formData.append('mobile',this.space.mobile);
      formData.append('attachment',this.space.attachment);
      formData.append('space_location',this.space.space_location);

      this.util.presentLoader();
      this.user.addSpaceData(formData,this.userData.Authorization).subscribe(res=>{
        let resp : any =res;
        // if (resp.status){
          this.util.presentAlert('',resp.message);
          this.space = {
            space_name:'',
            description:'',
            start_date:'',
            end_date:'',
            area:'',
            price:'',
            first_name:'',
            last_name:'',
            email:'',
            mobile:'',
            attachment:'',
            space_location:''
          }
          this.attachmentToShow='';
          this.navCtrl.popToRoot();
        // }
        setTimeout(()=>{
          this.util.dismissLoader();
        },500);
      },error => {
        console.error(error);
        this.util.dismissLoader();
      });
    }
  }

  validate() {
    if (this.space.space_name.trim() === ''){
      this.util.presentToast('Please enter space name');
      return false;
    }
    if (this.space.space_location.trim() === ''){
      this.util.presentToast('Please enter space location');
      return false;
    }
    if (this.space.start_date.trim() === ''){
      this.util.presentToast('Please enter space start date');
      return false;
    }
    if (this.space.end_date.trim() === ''){
      this.util.presentToast('Please enter space end date');
      return false;
    }
    if (this.space.start_date.trim() > this.space.end_date.trim()){
      this.util.presentToast('Wrong start and end date');
      return false;
    }
    if (this.space.price === ''){
      this.util.presentToast('Please enter space price name');
      return false;
    }
    if (this.space.email.trim() === ''){
      this.util.presentToast('Please enter email');
      return false;
    }
    // if (this.space.last_name.trim() === ''){
    //   this.util.presentToast('Please enter last name');
    //   return false;
    // }
    return true;
  }

  getUserData() {
    this.storage.get('userData').then(userData=> {
      this.userData = JSON.parse(userData);
    })
  }

  getAttachmentEvent(event) {
    this.space.attachment = event.target.files[0];
    let reader = new FileReader();
    let that = this;
    reader.onload = function(){
      that.attachmentToShow = reader.result;
    };
    reader.readAsDataURL(event.target.files[0]);
  };
}
