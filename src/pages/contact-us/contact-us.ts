import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {UtilProvider} from "../../providers/util/util";
import {User} from "../../providers";
import {Storage} from "@ionic/storage";

/**
 * Generated class for the ContactUsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-contact-us',
  templateUrl: 'contact-us.html',
})
export class ContactUsPage {
  message: any = '';
  email: any = '';
  name: any = '';
  userData: any = '';

  constructor(public navCtrl: NavController,
              public util: UtilProvider,
              public user: User,
              public storage: Storage,
              public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.getUserData();
  }

  getUserData() {
    this.storage.get('userData').then(userData=>{
      this.userData = JSON.parse(userData);
      this.email = this.userData.email;
      this.name = this.userData.username;
    })
  }

  send() {
    if (this.name.trim() ==''){
      this.util.presentToast('Please enter your name');
      return;
    }
    if (this.message.trim() ==''){
      this.util.presentToast('Please enter your message');
      return;
    }
    this.util.presentLoader();
    let data = {
      name:this.name,
      email:this.email,
      message:this.message
    }
    this.user.contactUs(data,this.userData.Authorization).subscribe((resp) => {
        let response :any= resp;
        this.util.presentAlert('','Contacted Successfully');
        this.message = '';
        setTimeout(()=>{
          this.util.dismissLoader();
        },500);
      }, (err) => {
        console.error('ERROR :', err);
        this.util.dismissLoader();
        this.util.presentToast(err.error.message);
    });
  }
}
